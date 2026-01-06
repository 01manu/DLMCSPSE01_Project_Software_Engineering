// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiRequest } from "../api";

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("FARMER");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError("");
//     try {
//       await apiRequest("/auth/register", "POST", {
//         name,
//         email,
//         password,
//         role,
//       });
//       navigate("/login");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       {error && <p style={{ color: "red" }}>{String(error)}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:&nbsp;</label>
//           <input value={name} onChange={e => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Email:&nbsp;</label>
//           <input value={email} onChange={e => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password:&nbsp;</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Role:&nbsp;</label>
//           <select value={role} onChange={e => setRole(e.target.value)}>
//             <option value="FARMER">Farmer</option>
//             <option value="CONSUMER">Consumer</option>
//           </select>
//         </div>
//         <button type="submit">Create account</button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("FARMER");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError("");

    try {
      await apiRequest("/auth/register", "POST", {
        name,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Create Account
        </h2>

        {error && (
          <p className="mb-3 bg-red-100 border border-red-300 text-red-700 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block font-medium">Name</label>
            <input
              className="w-full border px-3 py-2 rounded-lg mt-1"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              className="w-full border px-3 py-2 rounded-lg mt-1"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              className="w-full border px-3 py-2 rounded-lg mt-1"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <select
              className="w-full border px-3 py-2 rounded-lg mt-1 bg-white"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="FARMER">Farmer</option>
              <option value="CONSUMER">Consumer</option>
            </select>
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

