// import { Link, useLocation } from "react-router-dom";
// import { useTheme } from "../ThemeContext";

// export default function DashboardLayout({ user, children }) {
//   const location = useLocation();
//   const { theme, toggleTheme } = useTheme();

//   const isActive = (path) => location.pathname === path;

//   const isConsumer = user?.role === "CONSUMER";
//   const isFarmer = user?.role === "FARMER";

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <aside className="hidden md:flex md:w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 backdrop-blur">
//           <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-lg">
//                 F2K
//               </div>
//               <div>
//                 <div className="text-sm font-semibold">Farm2Kitchen</div>
//                 <div className="text-xs text-slate-500">
//                   Smart local food chains
//                 </div>
//               </div>
//             </Link>
//           </div>

//           <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
//             {isConsumer && (
//               <div>
//                 <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
//                   Consumer
//                 </p>
//                 <ul className="space-y-1">
//                   <li>
//                     <Link
//                       to="/consumer/dashboard"
//                       className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
//                         isActive("/consumer/dashboard")
//                           ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
//                           : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
//                       }`}
//                     >
//                       <span>Dashboard</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/consumer/box"
//                       className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
//                         isActive("/consumer/box")
//                           ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
//                           : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
//                       }`}
//                     >
//                       <span>Subscription box</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/consumer/orders"
//                       className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
//                         isActive("/consumer/orders")
//                           ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
//                           : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
//                       }`}
//                     >
//                       <span>My subscriptions</span>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}

//             {isFarmer && (
//               <div>
//                 <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
//                   Farmer
//                 </p>
//                 <ul className="space-y-1">
//                   <li>
//                     <Link
//                       to="/farmer/dashboard"
//                       className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
//                         isActive("/farmer/dashboard")
//                           ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
//                           : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
//                       }`}
//                     >
//                       <span>Dashboard</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/farmer/forecast"
//                       className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
//                         isActive("/farmer/forecast")
//                           ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
//                           : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
//                       }`}
//                     >
//                       <span>Forecasts</span>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </nav>

//           {/* Footer / Theme toggle */}
//           <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
//             <span>{user?.email}</span>
//             <button
//               onClick={toggleTheme}
//               className="rounded-full border border-slate-300 dark:border-slate-700 px-2 py-1 text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800"
//             >
//               {theme === "dark" ? "Light mode" : "Dark mode"}
//             </button>
//           </div>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 flex flex-col">
//           <header className="md:hidden px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 flex items-center justify-between">
//             <span className="text-sm font-semibold">Farm2Kitchen</span>
//             <button
//               onClick={toggleTheme}
//               className="rounded-full border border-slate-300 dark:border-slate-700 px-2 py-1 text-[11px]"
//             >
//               {theme === "dark" ? "Light" : "Dark"}
//             </button>
//           </header>
//           <div className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }

// src/components/DashboardLayout.jsx
import { Link, useLocation } from "react-router-dom";

export default function DashboardLayout({ user, children }) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/consumer/dashboard" && location.pathname === "/consumer") ||
    (path === "/farmer/dashboard" && location.pathname === "/farmer");

  const isConsumer = user?.role === "CONSUMER";
  const isFarmer = user?.role === "FARMER";

  return (
    <div className="flex w-full min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-gray-200 bg-white">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold">
              F2K
            </div>
            <div>
              <div className="text-sm font-semibold">Farm2Kitchen</div>
              <div className="text-xs text-gray-500">
                Smart sustainable food chains
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {isConsumer && (
            <div>
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Consumer
              </p>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    to="/consumer/dashboard"
                    className={`block rounded-lg px-3 py-2 ${
                      isActive("/consumer/dashboard")
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/consumer/box"
                    className={`block rounded-lg px-3 py-2 ${
                      isActive("/consumer/box")
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Subscription box
                  </Link>
                </li>
                <li>
                  <Link
                    to="/consumer/orders"
                    className={`block rounded-lg px-3 py-2 ${
                      isActive("/consumer/orders")
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    My subscriptions
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {isFarmer && (
            <div>
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Farmer
              </p>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    to="/farmer"
                    className={`block rounded-lg px-3 py-2 ${
                      isActive("/farmer/dashboard") || isActive("/farmer")
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/farmer/forecast-dashboard"
                    className={`block rounded-lg px-3 py-2 ${
                      isActive("/farmer/forecast-dashboard")
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Forecasts
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>

        <div className="px-4 py-3 border-t border-gray-200 text-xs text-gray-500">
          {user?.email}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

