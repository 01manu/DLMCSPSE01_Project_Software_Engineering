// import { useEffect, useState } from "react";
// import { useAuth } from "../AuthContext";
// import { apiRequest } from "../api";
// import DashboardLayout from "../components/DashboardLayout";

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

// export default function ForecastDashboard() {
//   const { token } = useAuth();
//   const [forecasts, setForecasts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadForecasts = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await apiRequest("/forecast/all", "GET", null, token);
//       setForecasts(res.forecasts || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load forecasts.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadForecasts();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // CHART DATA
//   const chartData = {
//     labels: forecasts.map(f => f.product_name),
//     datasets: [
//       {
//         label: "Predicted Demand",
//         data: forecasts.map(f => f.predicted_quantity),
//         backgroundColor: "rgba(34,197,94,0.7)", // green-500
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: { legend: { display: false } },
//     scales: {
//       x: { ticks: { color: "#4b5563" } },
//       y: { beginAtZero: true, ticks: { color: "#4b5563" } },
//     },
//   };

//   return (
//     <DashboardLayout variant="farmer">
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-green-700">
//               Forecast Dashboard
//             </h2>
//             <p className="text-gray-600">
//               Demand forecast for all your products (FR4).
//             </p>
//           </div>
//           <button
//             onClick={loadForecasts}
//             className="px-4 py-2 text-sm rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
//           >
//             Recalculate forecasts
//           </button>
//         </div>

//         {error && (
//           <p className="bg-red-100 border border-red-300 text-red-700 p-2 rounded">
//             {error}
//           </p>
//         )}

//         {loading ? (
//           <p className="text-gray-500">Loading forecasts...</p>
//         ) : forecasts.length === 0 ? (
//           <p className="text-gray-500">
//             No products found to forecast. Create products first.
//           </p>
//         ) : (
//           <>
//             {/* Chart Section */}
//             <div className="bg-white rounded-xl shadow p-4">
//               <h3 className="text-lg font-semibold mb-2 text-gray-800">
//                 Predicted Demand Overview
//               </h3>
//               <Bar data={chartData} options={chartOptions} />
//             </div>

//             {/* Table Section */}
//             <div className="bg-white rounded-xl shadow p-4">
//               <h3 className="text-lg font-semibold mb-3 text-gray-800">
//                 Forecast Details
//               </h3>

//               <table className="w-full text-left text-sm">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="py-2">Product</th>
//                     <th>Category</th>
//                     <th>Predicted Qty</th>
//                     <th>Model</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {forecasts.map(f => (
//                     <tr key={f.product_id} className="border-b">
//                       <td className="py-2 font-medium">{f.product_name}</td>
//                       <td>{f.category}</td>
//                       <td>{f.predicted_quantity}</td>
//                       <td className="text-xs text-gray-500">{f.model}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }




import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../api";
import DashboardLayout from "../components/DashboardLayout";
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

export default function ForecastDashboard() {
  const { token } = useAuth();
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadForecasts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await apiRequest("/forecast/all", "GET", null, token);
      setForecasts(res.forecasts || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load forecasts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForecasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartData = {
    labels: forecasts.map(f => f.product_name),
    datasets: [
      {
        label: "Predicted Demand",
        data: forecasts.map(f => f.predicted_quantity),
        backgroundColor: "rgba(34,197,94,0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#4b5563" } },
      y: { beginAtZero: true, ticks: { color: "#4b5563" } },
    },
  };

  return (
    <DashboardLayout variant="farmer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
              Forecast Dashboard
            </h2>
            <p className="text-gray-600 dark:text-slate-300">
              AI-like demand forecast for all your products (FR4).
            </p>
          </div>
          <button
            onClick={loadForecasts}
            className="px-4 py-2 text-sm rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Recalculate forecasts
          </button>
        </div>

        {error && (
          <p className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-200 p-2 rounded text-sm">
            {error}
          </p>
        )}

        {loading ? (
          <LoadingOverlay text="Calculating AI-based forecasts..." />
        ) : forecasts.length === 0 ? (
          <p className="text-gray-500 dark:text-slate-300">
            No products found to forecast. Create products first.
          </p>
        ) : (
          <>
            {/* Chart Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Predicted Demand Overview
              </h3>
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Cards Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-slate-100">
                Forecast Details
              </h3>

              <div className="grid md:grid-cols-2 gap-3">
                {forecasts.map(f => (
                  <div
                    key={f.product_id}
                    className="
                      border border-gray-100 dark:border-slate-700 rounded-xl p-3
                      hover:shadow-md hover:border-green-200 dark:hover:border-green-500
                      transition-all duration-200 bg-white/70 dark:bg-slate-900/80
                    "
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-slate-100">
                          {f.product_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Category:{" "}
                          <span className="font-medium">
                            {f.category || "Uncategorized"}
                          </span>
                        </p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-700">
                        AI forecast
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                      Predicted quantity
                    </p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                      {f.predicted_quantity}
                    </p>

                    <p className="text-[11px] text-gray-500 dark:text-slate-400">
                      Model:{" "}
                      <span className="font-mono">
                        {f.model}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
