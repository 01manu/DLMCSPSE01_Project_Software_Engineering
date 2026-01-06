// import { useEffect, useState } from "react";
// import { useAuth } from "../AuthContext";
// import { apiRequest } from "../api";

// export default function ConsumerDashboard() {
//   const { token } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [box, setBox] = useState([]);
//   const [eco, setEco] = useState(null);
//   const [game, setGame] = useState(null);
//   const [quantities, setQuantities] = useState({}); // product_id -> quantity

//   const loadProducts = async () => {
//     const data = await apiRequest("/products", "GET");
//     setProducts(data);
//   };

//   const loadBox = async () => {
//     const data = await apiRequest("/consumer/box", "GET", null, token);
//     setBox(data);
//   };

//   const loadEco = async () => {
//     const data = await apiRequest("/eco/consumer", "GET", null, token);
//     setEco(data.eco_impact);
//   };

//   const loadGame = async () => {
//     const data = await apiRequest("/gamification/score", "GET", null, token);
//     setGame(data);
//   };

// useEffect(() => {
//   async function loadAll() {
//     await loadProducts();
//     await loadEco();
//   }
//   loadAll();
// }, []);

//   const handleAdd = async productId => {
//     const qty = quantities[productId] || 1;
//     await apiRequest(
//       "/consumer/box",
//       "POST",
//       { product_id: productId, quantity: qty },
//       token
//     );
//     await loadBox();
//     await loadEco();
//     await loadGame();
//   };

//   const handleRemove = async itemId => {
//     await apiRequest(`/consumer/box/${itemId}`, "DELETE", null, token);
//     await loadBox();
//     await loadEco();
//     await loadGame();
//   };

//   return (
//     <div>
//       <h2>Consumer Dashboard</h2>

//       {eco && (
//         <div style={{ border: "1px solid #ccc", padding: "0.5rem", marginBottom: "1rem" }}>
//           <h3>Your Eco Impact</h3>
//           <p>Total items: {eco.total_items}</p>
//           <p>Carbon reduction (kg): {eco.carbon_reduction_kg}</p>
//           <p>Distance saved (km): {eco.distance_saved_km}</p>
//           <p>Eco score: {eco.eco_score}</p>
//         </div>
//       )}

//       {game && (
//         <div style={{ border: "1px solid #ccc", padding: "0.5rem", marginBottom: "1rem" }}>
//           <h3>Your Gamification</h3>
//           <p>Points: {game.points}</p>
//           <p>Badge: {game.badge}</p>
//         </div>
//       )}

//       <h3>Browse Products</h3>
//       <ul>
//         {products.map(p => (
//           <li key={p.id} style={{ marginBottom: "0.5rem" }}>
//             <strong>{p.name}</strong> – €{p.price} – stock: {p.stock}
//             <br />
//             <input
//               type="number"
//               min={1}
//               value={quantities[p.id] || 1}
//               style={{ width: "60px" }}
//               onChange={e =>
//                 setQuantities(q => ({ ...q, [p.id]: Number(e.target.value) }))
//               }
//             />
//             <button onClick={() => handleAdd(p.id)}>Add to Box</button>
//           </li>
//         ))}
//       </ul>

//       <h3>Your Box</h3>
//       <ul>
//         {box.map(item => (
//           <li key={item.id}>
//             {item.product.name} × {item.quantity}{" "}
//             <button onClick={() => handleRemove(item.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useAuth } from "../AuthContext";
// import { apiRequest } from "../api";

// export default function ConsumerDashboard() {
//   const { token, user } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [box, setBox] = useState([]);
//   const [eco, setEco] = useState(null);
//   const [game, setGame] = useState(null);
//   const [quantities, setQuantities] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadProducts = async () => {
//     const data = await apiRequest("/products", "GET");
//     setProducts(data);
//   };

//   const loadBox = async () => {
//     const data = await apiRequest("/consumer/box", "GET", null, token);
//     setBox(data);
//   };

//   const loadEco = async () => {
//     const data = await apiRequest("/eco/consumer", "GET", null, token);
//     setEco(data.eco_impact);
//   };

//   const loadGame = async () => {
//     const data = await apiRequest("/gamification/score", "GET", null, token);
//     setGame(data);
//   };

//   useEffect(() => {
//     async function loadAll() {
//       try {
//         await loadProducts();
//         await loadBox();
//         await loadEco();
//         await loadGame();
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load consumer dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadAll();
//   }, []);

//   const handleAdd = async productId => {
//     setError("");
//     try {
//       const qty = quantities[productId] || 1;
//       await apiRequest(
//         "/consumer/box",
//         "POST",
//         { product_id: productId, quantity: qty },
//         token
//       );
//       await loadBox();
//       await loadEco();
//       await loadGame();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to add item to box");
//     }
//   };

//   const handleRemove = async itemId => {
//     if (!window.confirm("Remove this item from your box?")) return;
//     try {
//       await apiRequest(`/consumer/box/${itemId}`, "DELETE", null, token);
//       await loadBox();
//       await loadEco();
//       await loadGame();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to remove item from box");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-gray-600">
//         Loading consumer dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-green-700">
//             Consumer Dashboard
//           </h2>
//           {user && (
//             <p className="text-gray-600">
//               Hello, <span className="font-semibold">{user.name}</span>
//             </p>
//           )}
//         </div>

//         <div className="flex flex-col md:flex-row gap-4">
//           {eco && (
//             <div className="bg-white rounded-xl shadow p-4 min-w-[220px]">
//               <h3 className="font-semibold text-green-700 mb-2">Eco Impact</h3>
//               <p className="text-sm text-gray-600">
//                 Items: <span className="font-semibold">{eco.total_items}</span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 CO₂ Saved (kg):{" "}
//                 <span className="font-semibold">{eco.carbon_reduction_kg}</span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Distance Saved (km):{" "}
//                 <span className="font-semibold">{eco.distance_saved_km}</span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Eco Score: <span className="font-semibold">{eco.eco_score}</span>
//               </p>
//             </div>
//           )}

//           {game && (
//             <div className="bg-white rounded-xl shadow p-4 min-w-[220px]">
//               <h3 className="font-semibold text-yellow-700 mb-2">Gamification</h3>
//               <p className="text-sm text-gray-600">
//                 Points:{" "}
//                 <span className="font-semibold">{game.points}</span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Badge:{" "}
//                 <span className="font-semibold">{game.badge}</span>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {error && (
//         <p className="bg-red-100 border border-red-300 text-red-700 p-2 rounded">
//           {error}
//         </p>
//       )}

//       {/* Products grid */}
//       <section className="space-y-3">
//         <h3 className="text-lg font-semibold text-gray-800">
//           Available Products
//         </h3>
//         {products.length === 0 ? (
//           <p className="text-gray-500">No products available yet.</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {products.map(p => (
//               <div
//                 key={p.id}
//                 className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
//               >
//                 <div>
//                   <h4 className="font-bold text-lg text-gray-800">
//                     {p.name}
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     {p.category || "No category"}
//                   </p>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Price: <span className="font-semibold">€{p.price}</span>
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Stock: <span className="font-semibold">{p.stock}</span>
//                   </p>
//                 </div>

//                 <div className="flex gap-2 items-center mt-3">
//                   <input
//                     type="number"
//                     min={1}
//                     className="border rounded-lg px-2 py-1 w-20"
//                     value={quantities[p.id] || 1}
//                     onChange={e =>
//                       setQuantities(q => ({
//                         ...q,
//                         [p.id]: Number(e.target.value),
//                       }))
//                     }
//                   />
//                   <button
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded"
//                     onClick={() => handleAdd(p.id)}
//                   >
//                     Add to Box
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Subscription box */}
//       <section className="space-y-3">
//         <h3 className="text-lg font-semibold text-gray-800">
//           Your Subscription Box
//         </h3>
//         {box.length === 0 ? (
//           <p className="text-gray-500">Your box is empty. Add some items above.</p>
//         ) : (
//           <div className="bg-white rounded-xl shadow p-4">
//             <ul className="divide-y divide-gray-200">
//               {box.map(item => (
//                 <li key={item.id} className="py-2 flex justify-between items-center">
//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       {item.product.name}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Quantity: {item.quantity}
//                     </p>
//                   </div>
//                   <button
//                     className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                     onClick={() => handleRemove(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import { apiRequest } from "../api";
// import DashboardLayout from "../components/DashboardLayout";
// import Toast from "../components/Toast";
// import LoadingOverlay from "../components/LoadingOverlay";

// export default function ConsumerDashboard() {
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [boxItems, setBoxItems] = useState([]);
//   const [summary, setSummary] = useState({ total_items: 0, total_price: 0 });

//   const [eco, setEco] = useState(null);
//   const [game, setGame] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [checkingOut, setCheckingOut] = useState(false);
//   const [toast, setToast] = useState(null);

//   const showToast = (type, message) => setToast({ type, message });

//   // -------------------------
//   // API LOADERS
//   // -------------------------

//   const loadProducts = async () => {
//     const res = await apiRequest("/products", "GET", null, token);
//     setProducts(res.products || res || []);
//   };

//   const loadBox = async () => {
//     const res = await apiRequest("/consumer/box", "GET", null, token);
//     setBoxItems(res.items || []);
//     setSummary(res.summary || { total_items: 0, total_price: 0 });
//   };

//   const loadEco = async () => {
//     try {
//       const res = await apiRequest("/eco-impact/me", "GET", null, token);
//       setEco(res.eco_impact);
//     } catch (err) {
//       console.error("Failed to load eco impact", err);
//       // leave eco as null → UI will show 0
//     }
//   };

//   const loadGame = async () => {
//     try {
//       const res = await apiRequest("/gamification/me", "GET", null, token);
//       setGame(res);
//     } catch (err) {
//       console.error("Failed to load gamification", err);
//       // leave game as null → UI will show defaults
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       try {
//         setLoading(true);
//         await Promise.all([loadProducts(), loadBox(), loadEco(), loadGame()]);
//       } catch (err) {
//         console.error(err);
//         showToast("error", "Failed to load dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };
//     init();
//   }, [token]);

//   // -------------------------
//   // BOX ACTIONS
//   // -------------------------

//   const handleAddToBox = async (product) => {
//     try {
//       await apiRequest(
//         "/consumer/box",
//         "POST",
//         { product_id: product.id, quantity: 1 },
//         token
//       );
//       showToast("success", `Added ${product.name}`);
//       await loadBox();
//       await loadProducts();
//       await loadEco();
//       await loadGame();
//     } catch (err) {
//       console.error(err);
//       showToast("error", err.error || "Unable to add");
//     }
//   };

//   const handleUpdateQuantity = async (item, newQty) => {
//     if (newQty <= 0) return handleRemoveItem(item);

//     try {
//       await apiRequest(
//         `/consumer/box/${item.id}`,
//         "PUT",
//         { quantity: newQty },
//         token
//       );
//       showToast("success", "Updated");
//       await loadBox();
//       await loadProducts();
//       await loadEco();
//       await loadGame();
//     } catch (err) {
//       console.error(err);
//       showToast("error", err.error || "Update failed");
//     }
//   };

//   const handleRemoveItem = async (item) => {
//     try {
//       await apiRequest(`/consumer/box/${item.id}`, "DELETE", null, token);
//       showToast("success", "Removed");
//       await loadBox();
//       await loadProducts();
//       await loadEco();
//       await loadGame();
//     } catch (err) {
//       console.error(err);
//       showToast("error", "Failed to remove");
//     }
//   };

//   // -------------------------
//   // CHECKOUT
//   // -------------------------

//   const handleCheckout = async () => {
//     try {
//       setCheckingOut(true);
//       await apiRequest("/consumer/checkout", "POST", null, token);

//       showToast("success", "Subscription confirmed!");

//       // refresh eco & gamification after successful order
//       await loadEco();
//       await loadGame();
//       await loadBox();

//       // then navigate to order history
//       navigate("/consumer/orders");
//     } catch (err) {
//       console.error(err);
//       showToast("error", err.error || "Checkout failed");
//     } finally {
//       setCheckingOut(false);
//     }
//   };

//   // -------------------------
//   // DERIVED ECO VALUES (safe defaults)
//   // -------------------------

//   const carbon = eco?.carbon_reduction_kg ?? 0;
//   const distance = eco?.distance_saved_km ?? 0;
//   const points = game?.points ?? 0;
//   const badge = game?.badge || "No badge yet";

//   // -------------------------
//   // UI
//   // -------------------------

//   return (
//     <DashboardLayout variant="consumer">
//       <Toast toast={toast} onClose={() => setToast(null)} />

//       <div className="space-y-6">
//         <div className="flex flex-wrap items-center justify-between gap-2">
//           <div>
//             <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
//               Consumer Dashboard
//             </h1>
//             <p className="text-gray-600 dark:text-slate-300 text-sm">
//               Build your subscription box & track your eco impact.
//             </p>
//           </div>
//         </div>

//         {loading ? (
//           <LoadingOverlay text="Loading dashboard..." />
//         ) : (
//           <>
//             {/* =======================
//                 ECO + GAMIFICATION (ALWAYS VISIBLE)
//             ========================== */}
//             <div className="grid md:grid-cols-3 gap-4 mb-6">
//               {/* CO2 */}
//               <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
//                 <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-200">
//                   CO₂ Reduction
//                 </h3>
//                 <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                   {carbon.toFixed(2)} kg
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Saved by supporting local farms
//                 </p>
//               </div>

//               {/* Distance */}
//               <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
//                 <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-200">
//                   Distance Saved
//                 </h3>
//                 <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                   {distance.toFixed(1)} km
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Reduced transport emissions
//                 </p>
//               </div>

//               {/* Gamification */}
//               <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
//                 <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-200">
//                   Eco Score & Badge
//                 </h3>
//                 <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
//                   {points.toFixed(1)} pts
//                 </p>
//                 <p className="text-sm font-semibold">
//                   Badge: <span className="text-green-600">{badge}</span>
//                 </p>
//               </div>
//             </div>

//             {/* =======================
//                 MAIN GRID
//             ========================== */}
//             <div className="grid md:grid-cols-3 gap-6">
//               {/* ---------- PRODUCTS ---------- */}
//               <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow p-4">
//                 <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">
//                   Available local products
//                 </h2>

//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {products.map((p) => (
//                     <div
//                       key={p.id}
//                       className="border border-gray-100 dark:border-slate-700 rounded-xl p-3 hover:shadow-md transition"
//                     >
//                       <p className="font-semibold text-gray-800 dark:text-white">
//                         {p.name}
//                       </p>
//                       <p className="text-xs text-gray-500">{p.category}</p>
//                       <p className="text-xs mt-1">{p.description}</p>

//                       <div className="mt-2 flex items-center justify-between text-xs">
//                         <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800">
//                           €{Number(p.price).toFixed(2)}
//                         </span>
//                         <span className="text-gray-500">
//                           Stock:{" "}
//                           <span className="font-semibold">{p.stock}</span>
//                         </span>
//                       </div>

//                       <button
//                         className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 rounded-lg"
//                         onClick={() => handleAddToBox(p)}
//                         disabled={p.stock <= 0}
//                       >
//                         {p.stock > 0 ? "Add to box" : "Out of stock"}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* ---------- SUBSCRIPTION BOX ---------- */}
//               <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
//                 <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">
//                   Your subscription box
//                 </h2>

//                 {boxItems.length === 0 ? (
//                   <p className="text-sm text-gray-500">Your box is empty.</p>
//                 ) : (
//                   <>
//                     <div className="space-y-3 max-h-72 overflow-auto pr-1">
//                       {boxItems.map((item) => (
//                         <div
//                           key={item.id}
//                           className="border border-gray-100 dark:border-slate-700 rounded-lg p-2"
//                         >
//                           <div className="flex justify-between">
//                             <p className="font-semibold">
//                               {item.product?.name}
//                             </p>
//                             <button
//                               onClick={() => handleRemoveItem(item)}
//                               className="text-xs text-red-600 hover:underline"
//                             >
//                               Remove
//                             </button>
//                           </div>

//                           <div className="flex items-center justify-between mt-1">
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() =>
//                                   handleUpdateQuantity(item, item.quantity - 1)
//                                 }
//                                 className="w-6 h-6 border rounded-full"
//                               >
//                                 -
//                               </button>
//                               <span>{item.quantity}</span>
//                               <button
//                                 onClick={() =>
//                                   handleUpdateQuantity(item, item.quantity + 1)
//                                 }
//                                 className="w-6 h-6 border rounded-full"
//                               >
//                                 +
//                               </button>
//                             </div>
//                             <p className="font-semibold">
//                               €
//                               {(
//                                 Number(item.product?.price) * item.quantity
//                               ).toFixed(2)}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-4 border-t pt-3 text-sm">
//                       <div className="flex justify-between">
//                         <span>Items</span>
//                         <span>{summary.total_items}</span>
//                       </div>

//                       <div className="flex justify-between mt-1">
//                         <span>Total</span>
//                         <span>€{summary.total_price.toFixed(2)}</span>
//                       </div>

//                       <button
//                         onClick={handleCheckout}
//                         disabled={checkingOut}
//                         className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
//                       >
//                         {checkingOut ? "Processing..." : "Confirm subscription"}
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }


// src/pages/ConsumerDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../api";
import DashboardLayout from "../components/DashboardLayout";
import Toast from "../components/Toast";
import LoadingOverlay from "../components/LoadingOverlay";

export default function ConsumerDashboard() {
  const { token, user } = useAuth(); // ⬅️ include user so sidebar knows the role
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [boxItems, setBoxItems] = useState([]);
  const [summary, setSummary] = useState({ total_items: 0, total_price: 0 });

  const [eco, setEco] = useState(null);
  const [game, setGame] = useState(null);

  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => setToast({ type, message });

  // -------------------------
  // API LOADERS
  // -------------------------

  const loadProducts = async () => {
    const res = await apiRequest("/products", "GET", null, token);
    setProducts(res.products || res || []);
  };

  const loadBox = async () => {
    const res = await apiRequest("/consumer/box", "GET", null, token);
    setBoxItems(res.items || []);
    setSummary(res.summary || { total_items: 0, total_price: 0 });
  };

  const loadEco = async () => {
    try {
      // ✅ match backend route: /eco/consumer
      const res = await apiRequest("/eco/consumer", "GET", null, token);
      setEco(res.eco_impact);
    } catch (err) {
      console.error("Failed to load eco impact", err);
      // leave eco as null → UI will show 0
    }
  };

  const loadGame = async () => {
    try {
      // ✅ match backend route: /gamification/score
      const res = await apiRequest("/gamification/score", "GET", null, token);
      setGame(res);
    } catch (err) {
      console.error("Failed to load gamification", err);
      // leave game as null → UI will show defaults
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await Promise.all([loadProducts(), loadBox(), loadEco(), loadGame()]);
      } catch (err) {
        console.error(err);
        showToast("error", "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      init();
    }
  }, [token]);

  // -------------------------
  // BOX ACTIONS
  // -------------------------

  const handleAddToBox = async (product) => {
    try {
      await apiRequest(
        "/consumer/box",
        "POST",
        { product_id: product.id, quantity: 1 },
        token
      );
      showToast("success", `Added ${product.name}`);
      await loadBox();
      await loadProducts();
      await loadEco();
      await loadGame();
    } catch (err) {
      console.error(err);
      showToast("error", err.error || "Unable to add");
    }
  };

  const handleUpdateQuantity = async (item, newQty) => {
    if (newQty <= 0) return handleRemoveItem(item);

    try {
      await apiRequest(
        `/consumer/box/${item.id}`,
        "PUT",
        { quantity: newQty },
        token
      );
      showToast("success", "Updated");
      await loadBox();
      await loadProducts();
      await loadEco();
      await loadGame();
    } catch (err) {
      console.error(err);
      showToast("error", err.error || "Update failed");
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await apiRequest(`/consumer/box/${item.id}`, "DELETE", null, token);
      showToast("success", "Removed");
      await loadBox();
      await loadProducts();
      await loadEco();
      await loadGame();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to remove");
    }
  };

  // -------------------------
  // CHECKOUT
  // -------------------------

  const handleCheckout = async () => {
    try {
      setCheckingOut(true);
      await apiRequest("/consumer/checkout", "POST", null, token);

      showToast("success", "Subscription confirmed!");

      // refresh eco & gamification after successful order
      await loadEco();
      await loadGame();
      await loadBox();

      // then navigate to order history
      navigate("/consumer/orders");
    } catch (err) {
      console.error(err);
      showToast("error", err.error || "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  // -------------------------
  // DERIVED ECO VALUES (safe defaults)
  // -------------------------

  const carbon = eco?.carbon_reduction_kg ?? 0;
  const distance = eco?.distance_saved_km ?? 0;
  const points = game?.points ?? 0;
  const badge = game?.badge || "No badge yet";

  // -------------------------
  // UI
  // -------------------------

  return (
    <DashboardLayout user={user}>
      {/* ⬆️ pass user so sidebar knows whether to show Consumer menu */}

      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-green-700">
              Consumer Dashboard
            </h1>
            <p className="text-gray-600 text-sm">
              Build your subscription box & track your eco impact.
            </p>
          </div>
        </div>

        {loading ? (
          <LoadingOverlay text="Loading dashboard..." />
        ) : (
          <>
            {/* ECO + GAMIFICATION */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* CO2 */}
              <div className="bg-white shadow rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  CO₂ Reduction
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {carbon.toFixed(2)} kg
                </p>
                <p className="text-xs text-gray-500">
                  Saved by supporting local farms
                </p>
              </div>

              {/* Distance */}
              <div className="bg-white shadow rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Distance Saved
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {distance.toFixed(1)} km
                </p>
                <p className="text-xs text-gray-500">
                  Reduced transport emissions
                </p>
              </div>

              {/* Gamification */}
              <div className="bg-white shadow rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Eco Score & Badge
                </h3>
                <p className="text-xl font-bold text-purple-600">
                  {points.toFixed(1)} pts
                </p>
                <p className="text-sm font-semibold">
                  Badge: <span className="text-green-600">{badge}</span>
                </p>
              </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* PRODUCTS */}
              <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  Available local products
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="border border-gray-100 rounded-xl p-3 hover:shadow-md transition"
                    >
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category}</p>
                      <p className="text-xs mt-1">{p.description}</p>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-gray-100">
                          €{Number(p.price).toFixed(2)}
                        </span>
                        <span className="text-gray-500">
                          Stock:{" "}
                          <span className="font-semibold">{p.stock}</span>
                        </span>
                      </div>

                      <button
                        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 rounded-lg"
                        onClick={() => handleAddToBox(p)}
                        disabled={p.stock <= 0}
                      >
                        {p.stock > 0 ? "Add to box" : "Out of stock"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBSCRIPTION BOX (quick view) */}
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  Your subscription box
                </h2>

                {boxItems.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Your box is empty.
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-72 overflow-auto pr-1">
                      {boxItems.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-100 rounded-lg p-2"
                        >
                          <div className="flex justify-between">
                            <p className="font-semibold">
                              {item.product?.name}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item,
                                    item.quantity - 1
                                  )
                                }
                                className="w-6 h-6 border rounded-full"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item,
                                    item.quantity + 1
                                  )
                                }
                                className="w-6 h-6 border rounded-full"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-semibold">
                              €
                              {(
                                Number(item.product?.price) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 border-t pt-3 text-sm">
                      <div className="flex justify-between">
                        <span>Items</span>
                        <span>{summary.total_items}</span>
                      </div>

                      <div className="flex justify-between mt-1">
                        <span>Total</span>
                        <span>€{summary.total_price.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={handleCheckout}
                        disabled={checkingOut}
                        className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
                      >
                        {checkingOut ? "Processing..." : "Confirm subscription"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}






