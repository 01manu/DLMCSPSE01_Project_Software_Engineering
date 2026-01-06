// export default function ForecastModal({ open, onClose, product, forecast }) {
//   if (!open || !forecast || !product) return null;

//   const { predicted_quantity, model_used, created_at } = forecast;

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
//         >
//           ×
//         </button>

//         <h3 className="text-xl font-semibold mb-3 text-gray-800">
//           Demand forecast
//         </h3>

//         {/* Product info */}
//         <div className="mb-4">
//           <p className="text-sm text-gray-500">Product</p>
//           <p className="text-lg font-semibold text-gray-800">
//             {product.name}
//           </p>
//           <p className="text-sm text-gray-600">
//             Category:{" "}
//             <span className="font-medium">
//               {product.category || "Uncategorized"}
//             </span>
//           </p>
//         </div>

//         {/* Forecast details */}
//         <div className="bg-gray-50 rounded-xl p-4 mb-4">
//           <p className="text-sm text-gray-600">
//             Predicted quantity needed for next period:
//           </p>
//           <p className="text-3xl font-bold text-green-700 mt-1">
//             {predicted_quantity}
//           </p>

//           <p className="text-xs text-gray-500 mt-3">
//             Model used:{" "}
//             <span className="font-semibold">
//               {model_used || "N/A"}
//             </span>
//           </p>

//           {created_at && (
//             <p className="text-xs text-gray-500">
//               Generated at:{" "}
//               <span className="font-mono">
//                 {created_at}
//               </span>
//             </p>
//           )}
//         </div>

//         <p className="text-xs text-gray-500 mb-4">
//           This forecast is calculated from recent subscription box data
//           (FR4 – Demand forecasting) and helps you plan your harvest and stock
//           more sustainably.
//         </p>

//         <div className="flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-1.5 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function ForecastModal({ open, onClose, product, forecast }) {
  if (!open || !forecast || !product) return null;

  const { predicted_quantity, model_used, created_at } = forecast;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 text-xl"
        >
          ×
        </button>

        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-slate-100">
          Demand forecast
        </h3>

        {/* Product info */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-slate-400">Product</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-slate-100">
            {product.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Category:{" "}
            <span className="font-medium">
              {product.category || "Uncategorized"}
            </span>
          </p>
        </div>

        {/* Forecast details */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Predicted quantity needed for next period:
          </p>
          <p className="text-3xl font-bold text-green-700 dark:text-green-400 mt-1">
            {predicted_quantity}
          </p>

          <p className="text-xs text-gray-500 dark:text-slate-400 mt-3">
            Model used:{" "}
            <span className="font-semibold">
              {model_used || "N/A"}
            </span>
          </p>

          {created_at && (
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Generated at:{" "}
              <span className="font-mono">
                {created_at}
              </span>
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
          This forecast is calculated from an AI-like hybrid model combining
          stock levels, price and category (FR4 – demand forecasting).
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
