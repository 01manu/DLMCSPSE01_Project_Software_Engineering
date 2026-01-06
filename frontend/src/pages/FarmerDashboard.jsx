// // import { useEffect, useState } from "react";
// // import { useAuth } from "../AuthContext";
// // import { apiRequest } from "../api";

// // export default function FarmerDashboard() {
// //   const { token } = useAuth();
// //   const [products, setProducts] = useState([]);
// //   const [form, setForm] = useState({
// //     name: "",
// //     description: "",
// //     price: 0,
// //     stock: 0,
// //     category: "",
// //   });
// //   const [eco, setEco] = useState(null);

// //   const loadProducts = async () => {
// //     const data = await apiRequest("/farmer/products", "GET", null, token);
// //     setProducts(data);
// //   };

// //   const loadEco = async () => {
// //     const data = await apiRequest("/eco/farmer", "GET", null, token);
// //     setEco(data.eco_impact);
// //   };

// // useEffect(() => {
// //   async function loadAll() {
// //     await loadProducts();
// //     await loadEco();
// //   }
// //   loadAll();
// // }, []);

// //   const handleCreate = async e => {
// //     e.preventDefault();
// //     await apiRequest("/farmer/products", "POST", form, token);
// //     setForm({ name: "", description: "", price: 0, stock: 0, category: "" });
// //     loadProducts();
// //   };

// //   const handleDelete = async id => {
// //     await apiRequest(`/farmer/products/${id}`, "DELETE", null, token);
// //     loadProducts();
// //   };

// //   const handleForecast = async id => {
// //     const res = await apiRequest(`/forecast/${id}`, "GET", null, token);
// //     alert(
// //       `Forecast for product ${id}: ${res.forecast.predicted_quantity} units (model: ${res.forecast.model_used})`
// //     );
// //   };

// //   const handleTrace = id => {
// //     window.open(`http://127.0.0.1:5000/trace/product/${id}`, "_blank");
// //   };

// //   return (
// //     <div>
// //       <h2>Farmer Dashboard</h2>

// //       {eco && (
// //         <div style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "0.5rem" }}>
// //           <h3>Eco Impact Summary</h3>
// //           <p>Total items: {eco.total_items}</p>
// //           <p>Carbon reduction (kg): {eco.carbon_reduction_kg}</p>
// //           <p>Distance saved (km): {eco.distance_saved_km}</p>
// //           <p>Eco score: {eco.eco_score}</p>
// //         </div>
// //       )}

// //       <h3>Create Product</h3>
// //       <form onSubmit={handleCreate}>
// //         <input
// //           placeholder="Name"
// //           value={form.name}
// //           onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
// //           required
// //         />
// //         <input
// //           placeholder="Category"
// //           value={form.category}
// //           onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
// //         />
// //         <input
// //           placeholder="Price"
// //           type="number"
// //           step="0.01"
// //           value={form.price}
// //           onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
// //           required
// //         />
// //         <input
// //           placeholder="Stock"
// //           type="number"
// //           value={form.stock}
// //           onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
// //           required
// //         />
// //         <input
// //           placeholder="Description"
// //           value={form.description}
// //           onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
// //         />
// //         <button type="submit">Add Product</button>
// //       </form>

// //       <h3>Your Products</h3>
// //       <ul>
// //         {products.map(p => (
// //           <li key={p.id} style={{ marginBottom: "0.5rem" }}>
// //             <strong>{p.name}</strong> ({p.category}) – €{p.price} – stock: {p.stock}
// //             <br />
// //             <button onClick={() => handleForecast(p.id)}>Forecast</button>
// //             <button onClick={() => handleTrace(p.id)}>Trace / QR</button>
// //             <button onClick={() => handleDelete(p.id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }


// // import { useEffect, useState } from "react";
// // import { useAuth } from "../AuthContext";
// // import { apiRequest } from "../api";

// // export default function FarmerDashboard() {
// //   const { token, user } = useAuth();
// //   const [products, setProducts] = useState([]);
// //   const [eco, setEco] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [form, setForm] = useState({
// //     name: "",
// //     description: "",
// //     price: "",
// //     stock: "",
// //     category: "",
// //   });
// //   const [error, setError] = useState("");

// //   const loadProducts = async () => {
// //     const data = await apiRequest("/farmer/products", "GET", null, token);
// //     setProducts(data);
// //   };

// //   const loadEco = async () => {
// //     const data = await apiRequest("/eco/farmer", "GET", null, token);
// //     setEco(data.eco_impact);
// //   };

// //   useEffect(() => {
// //     async function loadAll() {
// //       try {
// //         await loadProducts();
// //         await loadEco();
// //       } catch (err) {
// //         console.error(err);
// //         setError("Failed to load farmer dashboard data.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     loadAll();
// //   }, []);

// //   const handleCreate = async e => {
// //     e.preventDefault();
// //     setError("");
// //     try {
// //       await apiRequest(
// //         "/farmer/products",
// //         "POST",
// //         {
// //           name: form.name,
// //           description: form.description,
// //           price: Number(form.price),
// //           stock: Number(form.stock),
// //           category: form.category,
// //         },
// //         token
// //       );
// //       setForm({ name: "", description: "", price: "", stock: "", category: "" });
// //       await loadProducts();
// //     } catch (err) {
// //       setError(err.message || "Failed to create product");
// //     }
// //   };

// //   const handleDelete = async id => {
// //     if (!window.confirm("Delete this product?")) return;
// //     try {
// //       await apiRequest(`/farmer/products/${id}`, "DELETE", null, token);
// //       await loadProducts();
// //     } catch (err) {
// //       console.error(err);
// //       setError("Failed to delete product");
// //     }
// //   };

// //   const handleForecast = async id => {
// //     try {
// //       const res = await apiRequest(`/forecast/${id}`, "GET", null, token);
// //       alert(
// //         `Forecast for "${res.forecast.product_id}": ` +
// //           `${res.forecast.predicted_quantity} units (model: ${res.forecast.model_used})`
// //       );
// //     } catch (err) {
// //       console.error(err);
// //       setError("Failed to generate forecast");
// //     }
// //   };

// //   const handleTrace = id => {
// //     window.open(`http://127.0.0.1:5000/trace/product/${id}`, "_blank");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center py-10 text-gray-600">
// //         Loading farmer dashboard...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col md:flex-row justify-between items-start gap-4">
// //         <div>
// //           <h2 className="text-2xl font-bold text-green-700">
// //             Farmer Dashboard
// //           </h2>
// //           {user && (
// //             <p className="text-gray-600">
// //               Welcome, <span className="font-semibold">{user.name}</span>
// //             </p>
// //           )}
// //         </div>

// //         {eco && (
// //           <div className="bg-white rounded-xl shadow p-4 min-w-[260px]">
// //             <h3 className="font-semibold text-green-700 mb-2">
// //               Eco Impact Summary
// //             </h3>
// //             <p className="text-sm text-gray-600">
// //               Total Items: <span className="font-semibold">{eco.total_items}</span>
// //             </p>
// //             <p className="text-sm text-gray-600">
// //               CO₂ Saved (kg):{" "}
// //               <span className="font-semibold">{eco.carbon_reduction_kg}</span>
// //             </p>
// //             <p className="text-sm text-gray-600">
// //               Distance Saved (km):{" "}
// //               <span className="font-semibold">{eco.distance_saved_km}</span>
// //             </p>
// //             <p className="text-sm text-gray-600">
// //               Eco Score: <span className="font-semibold">{eco.eco_score}</span>
// //             </p>
// //           </div>
// //         )}
// //       </div>

// //       {error && (
// //         <p className="bg-red-100 border border-red-300 text-red-700 p-2 rounded">
// //           {error}
// //         </p>
// //       )}

// //       {/* Create product form */}
// //       <section className="bg-white rounded-xl shadow p-5">
// //         <h3 className="text-lg font-semibold mb-3 text-gray-800">
// //           Create New Product
// //         </h3>
// //         <form
// //           onSubmit={handleCreate}
// //           className="grid md:grid-cols-2 gap-3 md:gap-4 items-end"
// //         >
// //           <div>
// //             <label className="block text-sm font-medium">Name</label>
// //             <input
// //               className="w-full border rounded-lg px-3 py-2 mt-1"
// //               value={form.name}
// //               onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium">Category</label>
// //             <input
// //               className="w-full border rounded-lg px-3 py-2 mt-1"
// //               value={form.category}
// //               onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium">Price</label>
// //             <input
// //               type="number"
// //               step="0.01"
// //               className="w-full border rounded-lg px-3 py-2 mt-1"
// //               value={form.price}
// //               onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium">Stock</label>
// //             <input
// //               type="number"
// //               className="w-full border rounded-lg px-3 py-2 mt-1"
// //               value={form.stock}
// //               onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
// //               required
// //             />
// //           </div>

// //           <div className="md:col-span-2">
// //             <label className="block text-sm font-medium">Description</label>
// //             <textarea
// //               className="w-full border rounded-lg px-3 py-2 mt-1"
// //               rows={2}
// //               value={form.description}
// //               onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
// //             />
// //           </div>

// //           <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg md:col-span-2 w-full md:w-auto">
// //             Add Product
// //           </button>
// //         </form>
// //       </section>

// //       {/* Products list */}
// //       <section className="space-y-3">
// //         <h3 className="text-lg font-semibold text-gray-800">
// //           Your Products
// //         </h3>
// //         {products.length === 0 ? (
// //           <p className="text-gray-500">No products yet. Create one above.</p>
// //         ) : (
// //           <div className="grid md:grid-cols-2 gap-4">
// //             {products.map(p => (
// //               <div
// //                 key={p.id}
// //                 className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
// //               >
// //                 <div>
// //                   <h4 className="font-bold text-lg text-gray-800">
// //                     {p.name}
// //                   </h4>
// //                   <p className="text-sm text-gray-500">
// //                     {p.category || "No category"}
// //                   </p>
// //                   <p className="text-sm text-gray-600 mt-1">
// //                     Price: <span className="font-semibold">€{p.price}</span>
// //                   </p>
// //                   <p className="text-sm text-gray-600">
// //                     Stock: <span className="font-semibold">{p.stock}</span>
// //                   </p>
// //                   {p.description && (
// //                     <p className="text-xs text-gray-500 mt-2">
// //                       {p.description}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="flex gap-2 mt-4">
// //                   <button
// //                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded"
// //                     onClick={() => handleForecast(p.id)}
// //                   >
// //                     Forecast
// //                   </button>
// //                   <button
// //                     className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded"
// //                     onClick={() => handleTrace(p.id)}
// //                   >
// //                     Trace / QR
// //                   </button>
// //                   <button
// //                     className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded"
// //                     onClick={() => handleDelete(p.id)}
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useAuth } from "../AuthContext";
// import { apiRequest } from "../api";
// import DashboardLayout from "../components/DashboardLayout";
// import Toast from "../components/Toast";
// import QrModal from "../components/QrModal";
// import ForecastModal from "../components/ForecastModal";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function FarmerDashboard() {
//   const { token, user } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [eco, setEco] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     category: "",
//   });
//   const [error, setError] = useState("");
//   const [toast, setToast] = useState(null);

//   const [forecastModalOpen, setForecastModalOpen] = useState(false);
//   const [forecastProduct, setForecastProduct] = useState(null);
//   const [forecastData, setForecastData] = useState(null);


//   const [qrModalOpen, setQrModalOpen] = useState(false);
//   const [qrData, setQrData] = useState({ qr_base64: "", qr_url: "" });

//   const showToast = (type, message) => {
//     setToast({ type, message });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const loadProducts = async () => {
//     const data = await apiRequest("/farmer/products", "GET", null, token);
//     setProducts(data);
//   };

//   const loadEco = async () => {
//     const data = await apiRequest("/eco/farmer", "GET", null, token);
//     setEco(data.eco_impact);
//   };

//   useEffect(() => {
//     async function loadAll() {
//       try {
//         await loadProducts();
//         await loadEco();
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load farmer dashboard data.");
//         showToast("error", "Failed to load farmer data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadAll();
//   }, []);

//   const handleCreate = async e => {
//     e.preventDefault();
//     setError("");
//     try {
//       await apiRequest(
//         "/farmer/products",
//         "POST",
//         {
//           name: form.name,
//           description: form.description,
//           price: Number(form.price),
//           stock: Number(form.stock),
//           category: form.category,
//         },
//         token
//       );
//       setForm({ name: "", description: "", price: "", stock: "", category: "" });
//       await loadProducts();
//       showToast("success", "Product created successfully.");
//     } catch (err) {
//       setError(err.message || "Failed to create product");
//       showToast("error", err.message || "Failed to create product.");
//     }
//   };

//   const handleDelete = async id => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await apiRequest(`/farmer/products/${id}`, "DELETE", null, token);
//       await loadProducts();
//       showToast("success", "Product deleted.");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete product");
//       showToast("error", "Failed to delete product.");
//     }
//   };

//   const handleForecast = async product => {
//   try {
//     const res = await apiRequest(`/forecast/${product.id}`, "GET", null, token);
//     console.log("Forecast API response:", res);

//     setForecastProduct(product);
//     setForecastData(res.forecast); // { predicted_quantity, model_used, created_at, ... }
//     setForecastModalOpen(true);

//     // Optional: still show a small toast
//     showToast(
//       "info",
//       `Forecast generated for "${product.name}".`
//     );
//   } catch (err) {
//     console.error(err);
//     showToast("error", "Failed to generate forecast.");
//   }
// };



//   const handleTrace = async id => {
//   try {
//     const res = await apiRequest(`/trace/product/${id}`, "GET", null, token);
//     console.log("QR API response:", res);  // keep this for debugging

//     setQrData({
//       qr_base64: res.qr_base64,
//       qr_url: res.qr_url,
//     });
//     setQrModalOpen(true);
//   } catch (err) {
//     console.error(err);
//     showToast("error", "Failed to load QR data.");
//   }
// };


//   // Chart data - stock per product
//   const stockChartData = {
//     labels: products.map(p => p.name),
//     datasets: [
//       {
//         label: "Stock",
//         data: products.map(p => p.stock),
//         backgroundColor: "rgba(34, 197, 94, 0.7)", // green-500
//       },
//     ],
//   };

//   const stockChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: "#4b5563",
//         },
//       },
//       y: {
//         ticks: {
//           color: "#4b5563",
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <DashboardLayout variant="farmer">
//         <div className="text-center py-10 text-gray-600">
//           Loading farmer dashboard...
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout variant="farmer">
//       <Toast toast={toast} onClose={() => setToast(null)} />
//       <QrModal
//         open={qrModalOpen}
//         onClose={() => setQrModalOpen(false)}
//         qrBase64={qrData.qr_base64}
//         qrUrl={qrData.qr_url}
//       />
//       <ForecastModal
//         open={forecastModalOpen}
//         onClose={() => setForecastModalOpen(false)}
//         product={forecastProduct}
//         forecast={forecastData}
//       />



//       <div className="space-y-6">
//         {/* Header + eco summary */}
//         <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-green-700">
//               Farmer Dashboard
//             </h2>
//             {user && (
//               <p className="text-gray-600">
//                 Welcome, <span className="font-semibold">{user.name}</span>
//               </p>
//             )}
//           </div>

//           {eco && (
//             <div className="bg-white rounded-xl shadow p-4 min-w-[260px]">
//               <h3 className="font-semibold text-green-700 mb-2">
//                 Eco Impact Summary
//               </h3>
//               <p className="text-sm text-gray-600">
//                 Total Items:{" "}
//                 <span className="font-semibold">{eco.total_items}</span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 CO₂ Saved (kg):{" "}
//                 <span className="font-semibold">
//                   {eco.carbon_reduction_kg}
//                 </span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Distance Saved (km):{" "}
//                 <span className="font-semibold">
//                   {eco.distance_saved_km}
//                 </span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Eco Score:{" "}
//                 <span className="font-semibold">{eco.eco_score}</span>
//               </p>
//             </div>
//           )}
//         </div>

//         {error && (
//           <p className="bg-red-100 border border-red-300 text-red-700 p-2 rounded">
//             {error}
//           </p>
//         )}

//         {/* Chart section */}
//         {products.length > 0 && (
//           <section className="bg-white rounded-xl shadow p-4">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">
//               Current stock overview
//             </h3>
//             <p className="text-xs text-gray-500 mb-3">
//               Visual overview of stock per product (helps with FR4 forecasting
//               decisions).
//             </p>
//             <Bar data={stockChartData} options={stockChartOptions} />
//           </section>
//         )}

//         {/* Create product form */}
//         <section className="bg-white rounded-xl shadow p-5">
//           <h3 className="text-lg font-semibold mb-3 text-gray-800">
//             Create New Product
//           </h3>
//           <form
//             onSubmit={handleCreate}
//             className="grid md:grid-cols-2 gap-3 md:gap-4 items-end"
//           >
//             <div>
//               <label className="block text-sm font-medium">Name</label>
//               <input
//                 className="w-full border rounded-lg px-3 py-2 mt-1"
//                 value={form.name}
//                 onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Category</label>
//               <input
//                 className="w-full border rounded-lg px-3 py-2 mt-1"
//                 value={form.category}
//                 onChange={e =>
//                   setForm(f => ({ ...f, category: e.target.value }))
//                 }
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Price</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 className="w-full border rounded-lg px-3 py-2 mt-1"
//                 value={form.price}
//                 onChange={e =>
//                   setForm(f => ({ ...f, price: e.target.value }))
//                 }
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Stock</label>
//               <input
//                 type="number"
//                 className="w-full border rounded-lg px-3 py-2 mt-1"
//                 value={form.stock}
//                 onChange={e =>
//                   setForm(f => ({ ...f, stock: e.target.value }))
//                 }
//                 required
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium">Description</label>
//               <textarea
//                 className="w-full border rounded-lg px-3 py-2 mt-1"
//                 rows={2}
//                 value={form.description}
//                 onChange={e =>
//                   setForm(f => ({ ...f, description: e.target.value }))
//                 }
//               />
//             </div>

//             <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg md:col-span-2 w-full md:w-auto">
//               Add Product
//             </button>
//           </form>
//         </section>

//         {/* Products list */}
//         <section className="space-y-3">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Your Products
//           </h3>
//           {products.length === 0 ? (
//             <p className="text-gray-500">
//               No products yet. Create one above.
//             </p>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {products.map(p => (
//                 <div
//                   key={p.id}
//                   className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
//                 >
//                   <div>
//                     <h4 className="font-bold text-lg text-gray-800">
//                       {p.name}
//                     </h4>
//                     <p className="text-sm text-gray-500">
//                       {p.category || "No category"}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Price: <span className="font-semibold">€{p.price}</span>
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Stock:{" "}
//                       <span className="font-semibold">{p.stock}</span>
//                     </p>
//                     {p.description && (
//                       <p className="text-xs text-gray-500 mt-2">
//                         {p.description}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex gap-2 mt-4">
//                     <button
//   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded"
//   onClick={() => handleForecast(p)}
// >
//   Forecast
// </button>
//                     <button
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded"
//                       onClick={() => handleTrace(p.id)}
//                     >
//                       QR / Trace
//                     </button>
//                     <button
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded"
//                       onClick={() => handleDelete(p.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </DashboardLayout>
//   );
// }



import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../api";
import DashboardLayout from "../components/DashboardLayout";
import Toast from "../components/Toast";
import QrModal from "../components/QrModal";
import ForecastModal from "../components/ForecastModal";
import LoadingOverlay from "../components/LoadingOverlay";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FarmerDashboard() {
  const { token, user } = useAuth();

  const [products, setProducts] = useState([]);
  const [ecoImpact, setEcoImpact] = useState(null);
  const [toast, setToast] = useState(null);

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrData, setQrData] = useState({ qr_base64: "", qr_url: "" });

  const [forecastModalOpen, setForecastModalOpen] = useState(false);
  const [forecastProduct, setForecastProduct] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const [loading, setLoading] = useState(true);

  const showToast = (type, message) => setToast({ type, message });

  const loadProducts = async () => {
    const res = await apiRequest("/farmer/products", "GET", null, token);
    setProducts(res.products || res || []);
  };

  const loadEco = async () => {
    try {
      const res = await apiRequest("/eco/farmer", "GET", null, token);
      setEcoImpact(res.eco_impact || res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await Promise.all([loadProducts(), loadEco()]);
      } catch (e) {
        console.error(e);
        showToast("error", "Failed to load farmer dashboard.");
      } finally {
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateProduct = async e => {
    e.preventDefault();
    const form = e.target;
    const body = {
      name: form.name.value,
      description: form.description.value,
      price: parseFloat(form.price.value || "0"),
      stock: parseInt(form.stock.value || "0", 10),
      category: form.category.value,
    };
    try {
      await apiRequest("/farmer/products", "POST", body, token);
      form.reset();
      showToast("success", "Product created.");
      await loadProducts();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to create product.");
    }
  };

  const handleDeleteProduct = async id => {
    try {
      await apiRequest(`/farmer/products/${id}`, "DELETE", null, token);
      showToast("success", "Product deleted.");
      await loadProducts();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to delete product.");
    }
  };

  const handleTrace = async product => {
    try {
      const res = await apiRequest(
        `/trace/product/${product.id}`,
        "GET",
        null,
        token
      );
      console.log("QR API response:", res);

      setQrData({
        qr_base64: res.qr_base64,
        qr_url: res.qr_url,
      });
      setQrModalOpen(true);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load QR data.");
    }
  };

  const handleForecast = async product => {
    try {
      const res = await apiRequest(`/forecast/${product.id}`, "GET", null, token);
      console.log("Forecast API response:", res);

      setForecastProduct(product);
      setForecastData(res.forecast);
      setForecastModalOpen(true);
      showToast("info", `Forecast generated for "${product.name}".`);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to generate forecast.");
    }
  };

  // Chart for stock overview
  const stockChartData = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: "Stock",
        data: products.map(p => p.stock),
        backgroundColor: "rgba(34,197,94,0.7)",
      },
    ],
  };

  const stockChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#4b5563" } },
      y: { beginAtZero: true, ticks: { color: "#4b5563" } },
    },
  };

  return (
    <DashboardLayout variant="farmer">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <QrModal
        open={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        qrBase64={qrData.qr_base64}
        qrUrl={qrData.qr_url}
      />
      <ForecastModal
        open={forecastModalOpen}
        onClose={() => setForecastModalOpen(false)}
        product={forecastProduct}
        forecast={forecastData}
      />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
              Farmer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-sm">
              Manage your local products, see eco impact, and forecast demand.
            </p>
          </div>
          {user && (
            <div className="text-xs text-gray-500 dark:text-slate-400">
              Role: <span className="font-semibold">{user.role}</span>
            </div>
          )}
        </div>

        {loading ? (
          <LoadingOverlay text="Loading your farmer data..." />
        ) : (
          <>
            {/* Top stats: Eco impact */}
            {ecoImpact && (
              <div className="grid md:grid-cols-3 gap-4">
                <EcoCard
                  title="Carbon reduction"
                  value={`${ecoImpact.carbon_reduction_kg.toFixed(1)} kg CO₂`}
                  subtitle="Compared to conventional supply chain"
                />
                <EcoCard
                  title="Distance saved"
                  value={`${ecoImpact.distance_saved_km.toFixed(1)} km`}
                  subtitle="Transport avoided via local delivery"
                />
                <EcoCard
                  title="Eco score"
                  value={ecoImpact.eco_score.toFixed(1)}
                  subtitle="0–100 sustainability index"
                />
              </div>
            )}

            {/* Stock Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Stock overview
              </h3>
              {products.length === 0 ? (
                <p className="text-gray-500 dark:text-slate-300 text-sm">
                  No products yet. Add one below.
                </p>
              ) : (
                <Bar data={stockChartData} options={stockChartOptions} />
              )}
            </div>

            {/* Product management */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product list */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">
                  My products
                </h3>

                {products.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-slate-300">
                    No products yet. Use the form to add your first product.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
                    {products.map(p => (
                      <div
                        key={p.id}
                        className="border border-gray-100 dark:border-slate-700 rounded-xl p-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-slate-100">
                              {p.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {p.category || "Uncategorized"}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-700">
                            In stock: {p.stock}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-slate-300">
                          {p.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-1 text-xs">
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                            € {Number(p.price).toFixed(2)}
                          </span>
                          {p.is_active && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">
                              Active
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 mt-2 text-xs">
                          <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                            onClick={() => handleForecast(p)}
                          >
                            Forecast
                          </button>
                          <button
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1 rounded"
                            onClick={() => handleTrace(p)}
                          >
                            QR / Trace
                          </button>
                          <button
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                            onClick={() => handleDeleteProduct(p.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* New product form */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">
                  Add new product
                </h3>
                <form
                  className="space-y-3 text-sm"
                  onSubmit={handleCreateProduct}
                >
                  <div>
                    <label className="block text-gray-700 dark:text-slate-200 mb-1">
                      Name
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-slate-200 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows="2"
                      className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-gray-700 dark:text-slate-200 mb-1">
                        Price (€)
                      </label>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-slate-200 mb-1">
                        Stock
                      </label>
                      <input
                        name="stock"
                        type="number"
                        min="0"
                        className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-slate-200 mb-1">
                        Category
                      </label>
                      <input
                        name="category"
                        className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800"
                        placeholder="Vegetable, Fruit..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Save product
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function EcoCard({ title, value, subtitle }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
      <p className="text-xs text-gray-500 dark:text-slate-400">{title}</p>
      <p className="text-xl font-bold text-green-700 dark:text-green-400 mt-1">
        {value}
      </p>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
        {subtitle}
      </p>
    </div>
  );
}

