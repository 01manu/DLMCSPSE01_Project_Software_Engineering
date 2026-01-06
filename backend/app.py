import os
import qrcode
import base64
import io
from io import BytesIO
from functools import wraps
from flask_cors import CORS
from datetime import datetime

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity, get_jwt
)
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# --- Config ---
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "fallback_secret")

db = SQLAlchemy(app)
jwt = JWTManager(app)

CO2_SAVED_PER_ITEM_KG = 0.4        # kg CO2 saved per item
DISTANCE_SAVED_PER_ITEM_KM = 1.0   # km saved per item


# =========================
# MODELS
# =========================

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # FARMER, CONSUMER, ADMIN

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
        }


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)
    category = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, default=True)

    farmer = db.relationship("User", backref="products")

    def to_dict(self):
        return {
            "id": self.id,
            "farmer_id": self.farmer_id,
            "name": self.name,
            "description": self.description,
            "price": float(self.price),
            "stock": self.stock,
            "category": self.category,
            "is_active": self.is_active,
        }


# Legacy box model (not used in new eco/gamification, but left for compatibility)
class SubscriptionBox(db.Model):
    __tablename__ = "subscription_box"

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship("Product")
    consumer = db.relationship("User")

    def to_dict(self):
        return {
            "id": self.id,
            "consumer_id": self.consumer_id,
            "product": self.product.to_dict(),
            "quantity": self.quantity,
            "created_at": self.created_at.isoformat()
        }


class SubscriptionBoxItem(db.Model):
    __tablename__ = "subscription_box_items"

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    consumer = db.relationship("User", backref="subscription_items")
    product = db.relationship("Product")

    def to_dict(self):
        return {
            "id": self.id,
            "consumer_id": self.consumer_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product": self.product.to_dict() if self.product else None,
        }


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    total_items = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship("OrderItem", backref="order", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "consumer_id": self.consumer_id,
            "total_items": self.total_items,
            "total_price": float(self.total_price),
            "created_at": self.created_at.isoformat(),
            "items": [i.to_dict() for i in self.items]
        }


class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship("Product")

    def to_dict(self):
        return {
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product": self.product.to_dict() if self.product else None
        }


class Forecast(db.Model):
    __tablename__ = "forecast"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    predicted_quantity = db.Column(db.Float, nullable=False)
    model_used = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship("Product")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "predicted_quantity": self.predicted_quantity,
            "model_used": self.model_used,
            "created_at": self.created_at.isoformat()
        }


# =========================
# HELPERS
# =========================

def role_required(required_role):
    """
    Decorator to allow only users with a specific role.
    Usage on route:
        @jwt_required()
        @role_required("FARMER")
    """
    def wrapper(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            claims = get_jwt()
            role = claims.get("role")
            if role != required_role:
                return jsonify({"error": "Forbidden: insufficient role"}), 403
            return fn(*args, **kwargs)
        return decorated
    return wrapper


def get_current_user():
    current_user_id = int(get_jwt_identity())
    return User.query.get_or_404(current_user_id)


def require_consumer():
    user = get_current_user()
    if user.role != "CONSUMER":
        raise PermissionError("Only consumers may perform this action")
    return user


# CLI helper
@app.cli.command("init-db")
def init_db():
    """Create all database tables."""
    db.create_all()
    print("✔ Database tables created")


# =========================
# BASIC ROUTES
# =========================

@app.route("/")
def home():
    return "Welcome!"


@app.route("/health")
def health():
    return jsonify({"status": "ok", "message": "Backend is running with DB!"})


# =========================
# AUTH
# =========================

@app.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")  # FARMER / CONSUMER / ADMIN

    if not all([name, email, password, role]):
        return jsonify({"error": "Missing required fields"}), 400

    if role not in ["FARMER", "CONSUMER", "ADMIN"]:
        return jsonify({"error": "Invalid role"}), 400

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({"error": "Email already registered"}), 400

    password_hash = generate_password_hash(password)

    user = User(
        name=name,
        email=email,
        password_hash=password_hash,
        role=role
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user": user.to_dict()}), 201


@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    # identity must be a string
    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role}
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    })


@app.route("/me", methods=["GET"])
@jwt_required()
def who_am_i():
    current_user_id = get_jwt_identity()
    try:
        current_user_id = int(current_user_id)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid token identity"}), 400

    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"user": user.to_dict()})


# =========================
# FARMER PRODUCT ENDPOINTS
# =========================

@app.route("/farmer/products", methods=["POST"])
@jwt_required()
@role_required("FARMER")
def create_product():
    current_user_id = int(get_jwt_identity())
    data = request.get_json() or {}

    name = data.get("name")
    price = data.get("price")
    stock = data.get("stock", 0)
    description = data.get("description", "")
    category = data.get("category", "")

    if not name or price is None:
        return jsonify({"error": "Missing required fields: name, price"}), 400

    try:
        price = float(price)
        stock = int(stock)
    except ValueError:
        return jsonify({"error": "Invalid number format"}), 400

    product = Product(
        farmer_id=current_user_id,
        name=name,
        description=description,
        price=price,
        stock=stock,
        category=category,
        is_active=True
    )
    db.session.add(product)
    db.session.commit()

    return jsonify({"message": "Product created", "product": product.to_dict()}), 201


@app.route("/farmer/products", methods=["GET"])
@jwt_required()
@role_required("FARMER")
def list_my_products():
    current_user_id = int(get_jwt_identity())
    products = Product.query.filter_by(farmer_id=current_user_id).all()
    return jsonify([p.to_dict() for p in products])


@app.route("/farmer/products/<int:product_id>", methods=["PUT"])
@jwt_required()
@role_required("FARMER")
def update_product(product_id):
    current_user_id = int(get_jwt_identity())
    product = Product.query.get(product_id)

    if not product or product.farmer_id != current_user_id:
        return jsonify({"error": "Product not found or not yours"}), 404

    data = request.get_json() or {}

    if "name" in data:
        product.name = data["name"]
    if "description" in data:
        product.description = data["description"]
    if "price" in data:
        try:
            product.price = float(data["price"])
        except ValueError:
            return jsonify({"error": "Price must be numeric"}), 400
    if "stock" in data:
        try:
            product.stock = int(data["stock"])
        except ValueError:
            return jsonify({"error": "Stock must be numeric"}), 400
    if "category" in data:
        product.category = data["category"]
    if "is_active" in data:
        product.is_active = bool(data["is_active"])

    db.session.commit()
    return jsonify({"message": "Product updated", "product": product.to_dict()})


@app.route("/farmer/products/<int:product_id>", methods=["DELETE"])
@jwt_required()
@role_required("FARMER")
def delete_product(product_id):
    current_user_id = int(get_jwt_identity())
    product = Product.query.get(product_id)

    if not product or product.farmer_id != current_user_id:
        return jsonify({"error": "Product not found or not yours"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted"})


# =========================
# PUBLIC PRODUCTS (BROWSE)
# =========================

@app.route("/products", methods=["GET"])
def browse_products():
    products = Product.query.filter_by(is_active=True).all()
    return jsonify([p.to_dict() for p in products])


# =========================
# SUBSCRIPTION BOX (CONSUMER)
# =========================

@app.route("/consumer/box", methods=["POST"])
@jwt_required()
def add_to_box():
    try:
        consumer = require_consumer()
    except PermissionError as e:
        return jsonify({"error": str(e)}), 403

    data = request.get_json() or {}
    product_id = data.get("product_id")
    quantity = int(data.get("quantity", 1))

    if not product_id or quantity <= 0:
        return jsonify({"error": "product_id and positive quantity required"}), 400

    product = Product.query.get_or_404(product_id)

    if product.stock < quantity:
        return jsonify({"error": "Not enough stock available"}), 400

    # Either create or update existing box item
    item = SubscriptionBoxItem.query.filter_by(
        consumer_id=consumer.id, product_id=product.id
    ).first()

    if item:
        new_quantity = item.quantity + quantity
        if product.stock < quantity:
            return jsonify({"error": "Not enough stock to add more"}), 400
        item.quantity = new_quantity
    else:
        item = SubscriptionBoxItem(
            consumer_id=consumer.id,
            product_id=product.id,
            quantity=quantity
        )
        db.session.add(item)

    # Reserve stock: decrease product stock
    product.stock -= quantity

    db.session.commit()

    return jsonify({"message": "Added to subscription box", "item": item.to_dict()})


@app.route("/consumer/box", methods=["GET"])
@jwt_required()
def get_subscription_box():
    try:
        consumer = require_consumer()
    except PermissionError as e:
        return jsonify({"error": str(e)}), 403

    items = SubscriptionBoxItem.query.filter_by(consumer_id=consumer.id).all()

    total_items = sum(i.quantity for i in items)
    total_price = sum(float(i.product.price) * i.quantity for i in items if i.product)

    return jsonify({
        "items": [i.to_dict() for i in items],
        "summary": {
            "total_items": total_items,
            "total_price": total_price,
        },
    })


@app.route("/consumer/box/<int:item_id>", methods=["PUT"])
@jwt_required()
def update_box_item(item_id):
    try:
        consumer = require_consumer()
    except PermissionError as e:
        return jsonify({"error": str(e)}), 403

    item = SubscriptionBoxItem.query.get_or_404(item_id)
    if item.consumer_id != consumer.id:
        return jsonify({"error": "Not your box item"}), 403

    data = request.get_json() or {}
    new_quantity = int(data.get("quantity", item.quantity))

    if new_quantity <= 0:
        return jsonify({"error": "Quantity must be positive"}), 400

    product = item.product

    # Calculate how much to adjust stock
    diff = new_quantity - item.quantity
    if diff > 0:
        # Need more stock
        if product.stock < diff:
            return jsonify({"error": "Not enough stock to increase quantity"}), 400
        product.stock -= diff
    elif diff < 0:
        # Returning stock
        product.stock += (-diff)

    item.quantity = new_quantity
    db.session.commit()

    return jsonify({"message": "Subscription item updated", "item": item.to_dict()})


@app.route("/consumer/box/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_box_item(item_id):
    try:
        consumer = require_consumer()
    except PermissionError as e:
        return jsonify({"error": str(e)}), 403

    item = SubscriptionBoxItem.query.get_or_404(item_id)
    if item.consumer_id != consumer.id:
        return jsonify({"error": "Not your box item"}), 403

    product = item.product

    # Return reserved stock
    product.stock += item.quantity

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item removed"})


@app.route("/consumer/checkout", methods=["POST"])
@jwt_required()
def checkout_subscription_box():
    try:
        consumer = require_consumer()
    except PermissionError as e:
        return jsonify({"error": str(e)}), 403

    items = SubscriptionBoxItem.query.filter_by(consumer_id=consumer.id).all()
    if not items:
        return jsonify({"error": "Your subscription box is empty"}), 400

    total_items = sum(i.quantity for i in items)
    total_price = sum(float(i.product.price) * i.quantity for i in items if i.product)

    # CREATE ORDER
    order = Order(
        consumer_id=consumer.id,
        total_items=total_items,
        total_price=total_price
    )
    db.session.add(order)
    db.session.flush()  # get order.id

    # CREATE ORDER ITEMS
    for i in items:
        oi = OrderItem(
            order_id=order.id,
            product_id=i.product_id,
            quantity=i.quantity
        )
        db.session.add(oi)

    # CLEAR SUBSCRIPTION BOX
    for i in items:
        db.session.delete(i)

    db.session.commit()

    return jsonify({
        "message": "Subscription confirmed",
        "order": order.to_dict()
    })


@app.route("/consumer/orders", methods=["GET"])
@jwt_required()
def get_orders():
    try:
        consumer = require_consumer()
    except PermissionError as e:
        return jsonify({"error": str(e)}), 403

    orders = Order.query.filter_by(consumer_id=consumer.id) \
        .order_by(Order.created_at.desc()).all()

    return jsonify({
        "orders": [o.to_dict() for o in orders]
    })


# =========================
# FORECASTING
# =========================

def simple_forecast(product_id: int) -> float:
    """
    Legacy simple forecasting using SubscriptionBox (not used now in main flow).
    """
    items = SubscriptionBox.query.filter_by(product_id=product_id).all()
    if not items:
        return 0.0

    quantities = [i.quantity for i in items]
    return sum(quantities) / len(quantities)


def ai_like_forecast_for_product(product):
    """
    Hybrid heuristic model that mimics an AI forecast:
    - Uses stock, price, and category as input signals
    - Produces a stable integer prediction
    """

    # 1) Base from stock
    base_from_stock = product.stock * 0.15  # 15% of current stock

    # 2) Price factor
    price = float(product.price) if product.price is not None else 0.0
    if price <= 0:
        price_factor = 1.0
    elif price < 2:
        price_factor = 1.4
    elif price < 5:
        price_factor = 1.2
    elif price < 10:
        price_factor = 1.0
    else:
        price_factor = 0.8

    # 3) Category factor
    category = (product.category or "").lower()
    category_factor_map = {
        "vegetable": 1.3,
        "vegitable": 1.3,  # typo friendly :)
        "leafy": 1.4,
        "fruit": 1.2,
        "grain": 1.1,
    }
    category_factor = category_factor_map.get(category, 1.0)

    # 4) Popularity pseudo-signal from name
    name = (product.name or "").strip().lower()
    name_hash = sum(ord(c) for c in name) if name else (product.id or 1)
    popularity_noise = (name_hash % 5) - 2  # [-2, +2]

    ai_score = base_from_stock * price_factor * category_factor + popularity_noise

    predicted_qty = int(round(max(1, min(ai_score, product.stock * 0.8 + 5))))
    return predicted_qty


def predict_demand_for_product(product_id):
    """
    Wrapper used by endpoints. Central place to change forecasting logic.
    """
    product = Product.query.get(product_id)
    if not product:
        return 1
    return ai_like_forecast_for_product(product)


@app.route("/forecast/<int:product_id>", methods=["GET"])
@jwt_required()
def forecast_single(product_id):
    current_user_id = int(get_jwt_identity())
    user = User.query.get_or_404(current_user_id)

    if user.role != "FARMER":
        return jsonify({"error": "Only farmers may request forecasts"}), 403

    product = Product.query.get_or_404(product_id)
    predicted_qty = predict_demand_for_product(product.id)

    return jsonify({
        "forecast": {
            "product_id": product.id,
            "product_name": product.name,
            "predicted_quantity": predicted_qty,
            "model_used": "ai_hybrid_stock_price_category_v1",
            "created_at": datetime.utcnow().isoformat() + "Z",
        }
    })


@app.route("/forecast/all", methods=["GET"])
@jwt_required()
def forecast_all():
    current_user_id = int(get_jwt_identity())
    farmer = User.query.get_or_404(current_user_id)
    if farmer.role != "FARMER":
        return jsonify({"error": "Only farmers may access forecasting"}), 403

    products = Product.query.filter_by(farmer_id=farmer.id).all()
    results = []

    for p in products:
        predicted_qty = predict_demand_for_product(p.id)
        results.append({
            "product_id": p.id,
            "product_name": p.name,
            "category": p.category,
            "predicted_quantity": predicted_qty,
            "model": "ai_hybrid_stock_price_category_v1",
        })

    return jsonify({"forecasts": results})


# =========================
# ECO IMPACT (FR5) – NOW BASED ON ORDERS
# =========================

def eco_score_from(carbon_kg, distance_km):
    return min(100.0, carbon_kg * 2.0 + distance_km * 1.0)


def compute_eco_for_consumer(consumer_id: int):
    """
    Computes eco impact for a consumer based on their ORDERS (confirmed subscriptions),
    not just the temporary box.
    """
    orders = Order.query.filter_by(consumer_id=consumer_id).all()
    if not orders:
        return {
            "total_items": 0,
            "carbon_reduction_kg": 0.0,
            "distance_saved_km": 0.0,
            "eco_score": 0.0,
            "model": {
                "co2_saved_per_item_kg": CO2_SAVED_PER_ITEM_KG,
                "distance_saved_per_item_km": DISTANCE_SAVED_PER_ITEM_KM,
                "formula": "eco_score = min(100, carbon_kg*2 + distance_km*1)"
            }
        }

    total_items = sum(o.total_items for o in orders)
    carbon_reduction_kg = total_items * CO2_SAVED_PER_ITEM_KG
    distance_saved_km = total_items * DISTANCE_SAVED_PER_ITEM_KM
    eco_score = eco_score_from(carbon_reduction_kg, distance_saved_km)

    return {
        "total_items": total_items,
        "carbon_reduction_kg": round(carbon_reduction_kg, 2),
        "distance_saved_km": round(distance_saved_km, 2),
        "eco_score": round(eco_score, 1),
        "model": {
            "co2_saved_per_item_kg": CO2_SAVED_PER_ITEM_KG,
            "distance_saved_per_item_km": DISTANCE_SAVED_PER_ITEM_KM,
            "formula": "eco_score = min(100, carbon_kg*2 + distance_km*1)"
        }
    }


def compute_eco_for_farmer(farmer_id: int):
    """
    Computes eco impact for a farmer based on ORDER ITEMS of products they own.
    """
    items = (
        OrderItem.query
        .join(Product, OrderItem.product_id == Product.id)
        .filter(Product.farmer_id == farmer_id)
        .all()
    )

    if not items:
        return {
            "total_items": 0,
            "carbon_reduction_kg": 0.0,
            "distance_saved_km": 0.0,
            "eco_score": 0.0,
            "model": {
                "co2_saved_per_item_kg": CO2_SAVED_PER_ITEM_KG,
                "distance_saved_per_item_km": DISTANCE_SAVED_PER_ITEM_KM,
                "formula": "eco_score = min(100, carbon_kg*2 + distance_km*1)"
            }
        }

    total_items = sum(i.quantity for i in items)
    carbon_reduction_kg = total_items * CO2_SAVED_PER_ITEM_KG
    distance_saved_km = total_items * DISTANCE_SAVED_PER_ITEM_KM
    eco_score = eco_score_from(carbon_reduction_kg, distance_saved_km)

    return {
        "total_items": total_items,
        "carbon_reduction_kg": round(carbon_reduction_kg, 2),
        "distance_saved_km": round(distance_saved_km, 2),
        "eco_score": round(eco_score, 1),
        "model": {
            "co2_saved_per_item_kg": CO2_SAVED_PER_ITEM_KG,
            "distance_saved_per_item_km": DISTANCE_SAVED_PER_ITEM_KM,
            "formula": "eco_score = min(100, carbon_kg*2 + distance_km*1)"
        }
    }


# Old separate endpoints – still valid and now using orders
@app.route("/eco/consumer", methods=["GET"])
@jwt_required()
@role_required("CONSUMER")
def eco_consumer():
    consumer_id = int(get_jwt_identity())
    result = compute_eco_for_consumer(consumer_id)
    return jsonify({
        "user_type": "CONSUMER",
        "consumer_id": consumer_id,
        "eco_impact": result
    })


@app.route("/eco/farmer", methods=["GET"])
@jwt_required()
@role_required("FARMER")
def eco_farmer():
    farmer_id = int(get_jwt_identity())
    result = compute_eco_for_farmer(farmer_id)
    return jsonify({
        "user_type": "FARMER",
        "farmer_id": farmer_id,
        "eco_impact": result
    })


# NEW unified endpoint used by frontend: /eco-impact/me
@app.route("/eco-impact/me", methods=["GET"])
@jwt_required()
def eco_impact_me():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.role == "CONSUMER":
        eco = compute_eco_for_consumer(user.id)
    elif user.role == "FARMER":
        eco = compute_eco_for_farmer(user.id)
    else:
        eco = {
            "total_items": 0,
            "carbon_reduction_kg": 0.0,
            "distance_saved_km": 0.0,
            "eco_score": 0.0,
            "model": {
                "co2_saved_per_item_kg": CO2_SAVED_PER_ITEM_KG,
                "distance_saved_per_item_km": DISTANCE_SAVED_PER_ITEM_KM,
                "formula": "eco_score = min(100, carbon_kg*2 + distance_km*1)"
            }
        }

    return jsonify({
        "user_id": user.id,
        "user_type": user.role,
        "eco_impact": eco
    })


# =========================
# GAMIFICATION (FR6) – BASED ON ORDERS + ECO
# =========================

def calculate_points_for_consumer(consumer_id: int):
    """
    Simple scoring:
      +10 points per ordered item
      + eco_score * 1
    """
    orders = Order.query.filter_by(consumer_id=consumer_id).all()
    total_items = sum(o.total_items for o in orders)

    eco = compute_eco_for_consumer(consumer_id)
    points = total_items * 10 + eco["eco_score"]

    return round(points, 2)


def determine_badge(points: float):
    """Return badge name based on points."""
    if points >= 200:
        return "Eco Champion"
    elif points >= 100:
        return "Eco Hero"
    elif points >= 50:
        return "Eco Supporter"
    elif points >= 20:
        return "Eco Beginner"
    else:
        return "No Badge"


@app.route("/gamification/score", methods=["GET"])
@jwt_required()
@role_required("CONSUMER")
def gamification_score():
    consumer_id = int(get_jwt_identity())

    points = calculate_points_for_consumer(consumer_id)
    badge = determine_badge(points)

    return jsonify({
        "consumer_id": consumer_id,
        "points": points,
        "badge": badge
    })


# NEW unified endpoint: /gamification/me (for both roles)
@app.route("/gamification/me", methods=["GET"])
@jwt_required()
def gamification_me():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.role == "CONSUMER":
        points = calculate_points_for_consumer(user.id)
    else:
        # For farmers: base points on their eco score
        eco = compute_eco_for_farmer(user.id)
        points = eco["eco_score"] * 1.5

    badge = determine_badge(points)

    return jsonify({
        "user_id": user.id,
        "user_type": user.role,
        "points": points,
        "badge": badge
    })


# =========================
# QR PRODUCT TRACEABILITY
# =========================

@app.route("/trace/product/<int:product_id>", methods=["GET"])
def trace_product(product_id):
    # Get product or 404
    product = Product.query.get_or_404(product_id)

    # eco impact summary (simplified – could also be per-product)
    eco_impact_summary = {
        "carbon_reduction_kg": 0,
        "distance_saved_km": 0,
        "eco_score": 0,
    }

    farmer_dict = None
    if product.farmer:
        farmer_dict = {
            "id": product.farmer.id,
            "name": product.farmer.name,
            "email": product.farmer.email,
            "role": product.farmer.role,
        }

    forecast_predicted_quantity = 0  # or call predict_demand_for_product(product.id)

    trace_url = f"http://127.0.0.1:5000/trace/product/{product.id}"

    # Generate QR PNG in memory
    img = qrcode.make(trace_url)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    qr_bytes = buf.getvalue()
    qr_base64 = base64.b64encode(qr_bytes).decode("utf-8")

    return jsonify({
        "eco_impact_summary": eco_impact_summary,
        "farmer": farmer_dict,
        "forecast_predicted_quantity": forecast_predicted_quantity,
        "product": {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": float(product.price),
            "stock": product.stock,
            "category": product.category,
            "farmer_id": product.farmer_id,
            "is_active": product.is_active,
        },
        "qr_base64": qr_base64,
        "qr_url": trace_url,
    })


# =========================
# MAIN
# =========================

if __name__ == "__main__":
    app.run(debug=True)
