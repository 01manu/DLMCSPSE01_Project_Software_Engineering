import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { apiRequest } from "../api";
import DashboardLayout from "../components/DashboardLayout";
import Toast from "../components/Toast";

export default function SubscriptionBoxPage() {
  const { user, token } = useAuth();

  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({ total_items: 0, total_price: 0 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Load subscription box
  useEffect(() => {
    const fetchBox = async () => {
      try {
        const res = await apiRequest("/consumer/box", "GET", null, token);
        setItems(res.items || []);
        setSummary(res.summary || { total_items: 0, total_price: 0 });
      } catch (err) {
        console.error("Error loading subscription box", err);
        setToast({
          type: "error",
          message: "Failed to load your subscription box.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBox();
  }, [token]);

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm("Remove this item from your subscription box?")) return;

    try {
      await apiRequest(`/consumer/box/${itemId}`, "DELETE", null, token);
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      setToast({
        type: "success",
        message: "Item removed from subscription box.",
      });
    } catch (err) {
      console.error("Error removing item", err);
      setToast({
        type: "error",
        message: "Could not remove item. Please try again.",
      });
    }
  };

  const formatPrice = (p) =>
    typeof p === "number" ? p.toFixed(2) : Number(p || 0).toFixed(2);

  return (
    <DashboardLayout user={user}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              My Subscription Box
            </h1>
            <p className="text-slate-500 text-sm">
              Review and manage the products in your Farm2Kitchen subscription.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              Your subscription box is currently empty.
            </p>
            <p className="text-sm text-slate-500">
              Go back to the dashboard, explore local products, and add them to
              your subscription box to see them listed here.
            </p>
          </div>
        ) : (
          <>
            {/* Summary card */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Total items
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  {summary.total_items}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Estimated monthly total
                </p>
                <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                  € {formatPrice(summary.total_price)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-emerald-500/10 to-lime-400/10 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-600">
                  Next step
                </p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-100">
                  You can confirm your subscription from the dashboard checkout
                  section and track your eco impact and reward points.
                </p>
              </div>
            </div>

            {/* Items table */}
            <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Products in your subscription box
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/80">
                    <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-center">Quantity</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {items.map((item) => {
                      const product = item.product || {};
                      const price = Number(product.price || 0);
                      const subtotal = price * item.quantity;

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900 dark:text-slate-50">
                                {product.name || "Product"}
                              </span>
                              <span className="text-xs text-slate-500">
                                {product.description || "No description"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                            {product.category || "-"}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-200">
                            € {formatPrice(price)}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-700 dark:text-slate-200">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-900 dark:text-slate-50 font-medium">
                            € {formatPrice(subtotal)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="inline-flex items-center justify-center rounded-full border border-red-100 dark:border-red-700/60 bg-red-50/70 dark:bg-red-900/40 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900 transition"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
