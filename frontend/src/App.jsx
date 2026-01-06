// // import { Routes, Route, Link, Navigate } from "react-router-dom";
// // import { useAuth } from "./AuthContext.jsx";
// // import LoginPage from "./pages/LoginPage.jsx";
// // import RegisterPage from "./pages/RegisterPage.jsx";
// // import FarmerDashboard from "./pages/FarmerDashboard.jsx";
// // import ConsumerDashboard from "./pages/ConsumerDashboard.jsx";

// // function PrivateRoute({ children, role }) {
// //   const { user } = useAuth();
// //   if (!user) return <Navigate to="/login" replace />;
// //   if (role && user.role !== role) return <Navigate to="/" replace />;
// //   return children;
// // }

// // export default function App() {
// //   const { user, logout } = useAuth();

// //   return (
// //     <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
// //       <header style={{ marginBottom: "1rem" }}>
// //         <h1>Farm2Kitchen</h1>
// //         <nav style={{ display: "flex", gap: "1rem" }}>
// //           <Link to="/">Home</Link>
// //           {!user && <Link to="/login">Login</Link>}
// //           {!user && <Link to="/register">Register</Link>}
// //           {user?.role === "FARMER" && <Link to="/farmer">Farmer Dashboard</Link>}
// //           {user?.role === "CONSUMER" && <Link to="/consumer">Consumer Dashboard</Link>}
// //           {user && <button onClick={logout}>Logout</button>}
// //         </nav>
// //         {user && <p>Logged in as {user.name} ({user.role})</p>}
// //       </header>

// //       <Routes>
// //         <Route path="/" element={<p>Welcome to Farm2Kitchen prototype.</p>} />
// //         <Route path="/login" element={<LoginPage />} />
// //         <Route path="/register" element={<RegisterPage />} />

// //         <Route
// //           path="/farmer"
// //           element={
// //             <PrivateRoute role="FARMER">
// //               <FarmerDashboard />
// //             </PrivateRoute>
// //           }
// //         />

// //         <Route
// //           path="/consumer"
// //           element={
// //             <PrivateRoute role="CONSUMER">
// //               <ConsumerDashboard />
// //             </PrivateRoute>
// //           }
// //         />

// //         <Route path="*" element={<p>Not found</p>} />
// //       </Routes>
// //     </div>
// //   );
// // }


// import { Routes, Route, Link, Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext.jsx";

// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import FarmerDashboard from "./pages/FarmerDashboard.jsx";
// import ConsumerDashboard from "./pages/ConsumerDashboard.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import ForecastDashboard from "./pages/ForecastDashboard.jsx";

// import SubscriptionBoxPage from "./pages/SubscriptionBoxPage.jsx";

// export default function App() {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-100 w-full">

//       {/* Navbar */}
//       <header className="bg-green-700 text-white shadow-md w-full">
//         <div className="w-full px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Farm2Kitchen</h1>

//           <nav className="flex gap-4 items-center">
//             <Link className="hover:underline" to="/">Home</Link>

//             {!user && (
//               <>
//                 <Link className="hover:underline" to="/login">Login</Link>
//                 <Link className="hover:underline" to="/register">Register</Link>
//               </>
//             )}

//             {user?.role === "FARMER" && (
//               <Link className="hover:underline" to="/farmer">Farmer Panel</Link>
//             )}

//             {user?.role === "CONSUMER" && (
//               <Link className="hover:underline" to="/consumer">Consumer Panel</Link>
//             )}

//             {user && (
//               <button
//                 onClick={logout}
//                 className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-sm"
//               >
//                 Logout
//               </button>
//             )}
//           </nav>
//         </div>
//       </header>

//       {/* Routes */}
//       <main className="w-full p-6">
//         <Routes>
//   <Route path="/" element={<HomePage />} />
//   <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
//   <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
//   <Route path="/farmer" element={user?.role === "FARMER" ? <FarmerDashboard /> : <Navigate to="/login" />} />
//   <Route path="/consumer" element={user?.role === "CONSUMER" ? <ConsumerDashboard /> : <Navigate to="/login" />} />
//   <Route path="/consumer/box"element={<RequireAuth role="CONSUMER"><SubscriptionBoxPage /></RequireAuth>}/>
//   <Route path="/consumer/dashboard" element={    <RequireAuth role="CONSUMER">      <ConsumerDashboard />    </RequireAuth> }/>
//   <Route path="/farmer/forecast-dashboard"element={user?.role === "FARMER" ? <ForecastDashboard /> : <Navigate to="/" />}/>
//   <Route path="/consumer/orders"element={<RequireAuth role="CONSUMER"><ConsumerOrdersPage /> {/* or whatever you named it */}</RequireAuth>}/>
// </Routes>
//       </main>
//     </div>
//   );
// }

// src/App.jsx
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import FarmerDashboard from "./pages/FarmerDashboard.jsx";
import ConsumerDashboard from "./pages/ConsumerDashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import ForecastDashboard from "./pages/ForecastDashboard.jsx";
import ConsumerOrders from "./pages/ConsumerOrders.jsx";
import SubscriptionBoxPage from "./pages/SubscriptionBoxPage.jsx";


// ---------- Auth guard ----------
function RequireAuth({ children, role }) {
  const { user, token } = useAuth();

  // Not logged in at all
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, enforce it
  if (role && user.role !== role) {
    // Redirect them to their own panel if roles don't match
    if (user.role === "FARMER") {
      return <Navigate to="/farmer" replace />;
    }
    if (user.role === "CONSUMER") {
      return <Navigate to="/consumer" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}


// ---------- Main App ----------
export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Navbar */}
      <header className="bg-green-700 text-white shadow-md w-full">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Farm2Kitchen</h1>

          <nav className="flex gap-4 items-center">
            <Link className="hover:underline" to="/">
              Home
            </Link>

            {!user && (
              <>
                <Link className="hover:underline" to="/login">
                  Login
                </Link>
                <Link className="hover:underline" to="/register">
                  Register
                </Link>
              </>
            )}

            {user?.role === "FARMER" && (
              <Link className="hover:underline" to="/farmer">
                Farmer Panel
              </Link>
            )}

            {user?.role === "CONSUMER" && (
              <Link className="hover:underline" to="/consumer">
                Consumer Panel
              </Link>
            )}

            {user && (
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Routes */}
      <main className="w-full p-6">
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterPage /> : <Navigate to="/" replace />}
          />

          {/* Farmer */}
          <Route
            path="/farmer"
            element={
              <RequireAuth role="FARMER">
                <FarmerDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/farmer/forecast-dashboard"
            element={
              <RequireAuth role="FARMER">
                <ForecastDashboard />
              </RequireAuth>
            }
          />

          {/* Consumer main dashboard */}
          <Route
            path="/consumer"
            element={
              <RequireAuth role="CONSUMER">
                <ConsumerDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/consumer/dashboard"
            element={
              <RequireAuth role="CONSUMER">
                <ConsumerDashboard />
              </RequireAuth>
            }
          />

          {/* Consumer subscription box */}
          <Route
            path="/consumer/box"
            element={
              <RequireAuth role="CONSUMER">
                <SubscriptionBoxPage />
              </RequireAuth>
            }
          />

          {/* Consumer orders */}
          <Route
            path="/consumer/orders"
            element={
              <RequireAuth role="CONSUMER">
                <ConsumerOrders />
              </RequireAuth>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

