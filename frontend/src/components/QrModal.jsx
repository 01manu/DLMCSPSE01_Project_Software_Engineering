// export default function QrModal({ open, onClose, qrBase64, qrUrl }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
//         >
//           ×
//         </button>

//         <h3 className="text-xl font-semibold mb-3 text-gray-800">
//           Product Traceability QR
//         </h3>

//         {qrBase64 ? (
//   <div className="flex flex-col items-center gap-3">
//     <img
//       src={`data:image/png;base64,${qrBase64}`}
//       alt="Product QR"
//       className="w-48 h-48 border border-gray-200 rounded-xl"
//     />
//     {qrUrl && (
//       <a
//         href={qrUrl}
//         target="_blank"
//         rel="noreferrer"
//         className="text-sm text-green-700 hover:underline"
//       >
//         Open traceability page
//       </a>
//     )}
//   </div>
// ) : (
//   <p className="text-gray-600 text-sm">Loading QR...</p>
// )}


//         <div className="mt-4 flex justify-end">
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


export default function QrModal({ open, onClose, qrBase64, qrUrl }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 text-xl"
        >
          ×
        </button>

        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-slate-100">
          Product Traceability QR
        </h3>

        {qrBase64 ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={`data:image/png;base64,${qrBase64}`}
              alt="Product QR"
              className="w-48 h-48 border border-gray-200 dark:border-slate-700 rounded-xl"
            />
            {qrUrl && (
              <a
                href={qrUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-green-700 dark:text-green-300 hover:underline"
              >
                Open traceability page
              </a>
            )}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-slate-300 text-sm">Loading QR...</p>
        )}

        <div className="mt-4 flex justify-end">
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
