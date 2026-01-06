// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiRequest } from "../api";
// import { useAuth } from "../AuthContext";

// export default function LoginPage() {
//   const [email, setEmail] = useState("farmer1@example.com");
//   const [password, setPassword] = useState("test123");
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await apiRequest("/auth/login", "POST", { email, password });
//       login(res.access_token, res.user);
//       if (res.user.role === "FARMER") navigate("/farmer");
//       else if (res.user.role === "CONSUMER") navigate("/consumer");
//       else navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{String(error)}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:&nbsp;</label>
//           <input value={email} onChange={e => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:&nbsp;</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("farmer1@example.com");
  const [password, setPassword] = useState("test123");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      login(res.access_token, res.user);

      if (res.user.role === "FARMER") navigate("/farmer");
      else navigate("/consumer");

    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Login
        </h2>

        {error && (
          <p className="mb-3 bg-red-100 border border-red-300 text-red-700 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block font-medium">Email</label>
            <input
              className="w-full border px-3 py-2 rounded-lg mt-1"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              className="w-full border px-3 py-2 rounded-lg mt-1"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
