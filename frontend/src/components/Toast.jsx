// export default function Toast({ toast, onClose }) {
//   if (!toast) return null;

//   const { type = "success", message } = toast;
//   const bg =
//     type === "error"
//       ? "bg-red-600"
//       : type === "info"
//       ? "bg-blue-600"
//       : "bg-green-600";

//   return (
//     <div className="fixed top-4 right-4 z-50">
//       <div
//         className={`${bg} text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2`}
//       >
//         <span className="text-sm">{message}</span>
//         <button
//           onClick={onClose}
//           className="text-xs font-bold border border-white/60 rounded px-2 py-0.5 hover:bg-white/20"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }


export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { type, message } = toast;

  const bg =
    type === "error"
      ? "bg-red-600"
      : type === "success"
      ? "bg-green-600"
      : "bg-blue-600";

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`${bg} text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3`}
      >
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className="text-xs underline decoration-white/70"
        >
          Close
        </button>
      </div>
    </div>
  );
}
