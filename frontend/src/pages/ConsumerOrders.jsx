import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../api";
import DashboardLayout from "../components/DashboardLayout";

export default function ConsumerOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiRequest("/consumer/orders", "GET", null, token)
      .then(res => setOrders(res.orders || []))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <DashboardLayout variant="consumer">
      <h1 className="text-2xl font-bold mb-4">My Subscriptions</h1>

      {orders.length === 0 ? (
        <p>No past subscriptions found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border p-4 rounded-lg shadow">
              <p className="font-semibold">
                Order #{order.id} – {new Date(order.created_at).toLocaleString()}
              </p>
              <p>Total Items: {order.total_items}</p>
              <p>Total Price: €{order.total_price}</p>

              <div className="mt-2 pl-3 border-l">
                {order.items.map(item => (
                  <div key={item.product_id} className="text-sm">
                    {item.product?.name} × {item.quantity}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
