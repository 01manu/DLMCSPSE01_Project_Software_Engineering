export default function LoadingOverlay({ text = "Loading...", inline = false }) {
  if (inline) {
    return (
      <div className="flex items-center gap-2 text-gray-500 dark:text-slate-300 text-sm">
        <span className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col items-center gap-3">
        <span className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-slate-300 text-sm">{text}</p>
      </div>
    </div>
  );
}
