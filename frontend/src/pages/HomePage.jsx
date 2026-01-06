// import { Link } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// export default function HomePage() {
//   const { user } = useAuth();

//   const primaryCtaPath =
//     user?.role === "FARMER" ? "/farmer" :
//     user?.role === "CONSUMER" ? "/consumer" :
//     "/register";

//   return (
//     <div className="w-full">

//       {/* HERO SECTION */}
//       <section className="w-full bg-gradient-to-r from-green-700 to-emerald-500 text-white py-16 md:py-24">
//         <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

//           <div className="flex-1">
//             <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//               Fresh food, straight from local farmers.
//             </h1>
//             <p className="text-lg md:text-xl text-green-100 mb-6">
//               Farm2Kitchen connects farmers and consumers directly, with
//               built-in forecasting, eco impact tracking, and transparent QR
//               traceability.
//             </p>

//             <div className="flex flex-wrap gap-3">
//               <Link
//                 to={primaryCtaPath}
//                 className="bg-white text-green-700 font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-50 transition"
//               >
//                 {user ? "Go to my dashboard" : "Get started"}
//               </Link>

//               {!user && (
//                 <Link
//                   to="/login"
//                   className="border border-white text-white font-semibold px-6 py-2 rounded-lg hover:bg-white/10 transition"
//                 >
//                   I already have an account
//                 </Link>
//               )}
//             </div>
//           </div>

//           <div className="flex-1">
//             <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-lg space-y-4">
//               <h2 className="font-bold text-xl mb-2">
//                 Why Farm2Kitchen?
//               </h2>
//               <ul className="space-y-2 text-sm md:text-base text-green-50">
//                 <li>• Farmers manage products & availability in one place</li>
//                 <li>• Consumers build flexible subscription boxes</li>
//                 <li>• Forecasting helps reduce food waste & stock-outs</li>
//                 <li>• QR codes show full traceability & eco impact</li>
//               </ul>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="w-full py-12 md:py-16 bg-gray-100">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//             Smart features for sustainable food chains
//           </h2>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             <FeatureCard
//               title="Direct from farmers"
//               text="No middlemen. Farmers control products, prices and stock directly in the platform."
//             />
//             <FeatureCard
//               title="Smart forecasting"
//               text="Built-in demand forecasting (FR4) using historical subscription data to plan harvests."
//             />
//             <FeatureCard
//               title="Eco impact tracking"
//               text="Each order contributes to CO₂ savings and distance reduction, measured automatically (FR5, FR6)."
//             />
//             <FeatureCard
//               title="QR traceability"
//               text="Every product can be traced via QR (FR7) showing origin, farmer and eco impact."
//             />
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS SECTION */}
//       <section className="w-full py-12 md:py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//             How Farm2Kitchen works
//           </h2>

//           <div className="grid md:grid-cols-4 gap-6">
//             <StepCard
//               number="1"
//               title="Farmers sign up"
//               text="Farmers register, create their profile and add available seasonal products."
//             />
//             <StepCard
//               number="2"
//               title="Consumers subscribe"
//               text="Consumers browse products and build their own flexible subscription boxes."
//             />
//             <StepCard
//               number="3"
//               title="System forecasts"
//               text="The system predicts needed quantities per product and supports sustainable planning."
//             />
//             <StepCard
//               number="4"
//               title="Transparent delivery"
//               text="Consumers receive boxes with QR codes showing origin and calculated eco impact."
//             />
//           </div>
//         </div>
//       </section>

//       {/* CALL TO ACTION SECTION */}
//       <section className="w-full py-12 md:py-16 bg-gray-100">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
//             Ready to try the prototype?
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Use this system as a proof-of-concept for your Software Engineering
//             project: all data is demo-only, but the flows are realistic and
//             aligned with your FR1–FR7 requirements.
//           </p>
//           <div className="flex justify-center gap-4 flex-wrap">
//             <Link
//               to="/register"
//               className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
//             >
//               Sign up as Farmer or Consumer
//             </Link>
//             <Link
//               to="/login"
//               className="border border-green-600 text-green-700 hover:bg-green-50 font-semibold px-6 py-2 rounded-lg"
//             >
//               Log in and explore
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// function FeatureCard({ title, text }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-4">
//       <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
//       <p className="text-sm text-gray-600">{text}</p>
//     </div>
//   );
// }

// function StepCard({ number, title, text }) {
//   return (
//     <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col h-full">
//       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold mb-3">
//         {number}
//       </div>
//       <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
//       <p className="text-sm text-gray-600">{text}</p>
//     </div>
//   );
// }



import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  const primaryCtaPath =
    user?.role === "FARMER"
      ? "/farmer"
      : user?.role === "CONSUMER"
      ? "/consumer"
      : "/register";

  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-r from-green-700 to-emerald-500 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

          {/* Left - text */}
          <div className="flex-1 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">
              Fresh food, straight from local farmers.
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-6">
              Farm2Kitchen connects farmers and consumers directly, with
              built-in forecasting, eco impact tracking, and transparent QR
              traceability.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to={primaryCtaPath}
                className="
                  bg-white text-green-700 font-semibold px-6 py-2 rounded-lg shadow 
                  hover:bg-green-50 
                  hover:scale-105 hover:-translate-y-0.5 
                  transition-transform transition-colors duration-200
                "
              >
                {user ? "Go to my dashboard" : "Get started"}
              </Link>

              {!user && (
                <Link
                  to="/login"
                  className="
                    border border-white text-white font-semibold px-6 py-2 rounded-lg 
                    hover:bg-white/10 
                    hover:scale-105 hover:-translate-y-0.5 
                    transition-transform transition-colors duration-200
                  "
                >
                  I already have an account
                </Link>
              )}
            </div>
          </div>

          {/* Right - floating info card */}
          <div className="flex-1">
            <div
              className="
                bg-white/10 backdrop-blur rounded-2xl p-6 shadow-lg space-y-4 
                animate-float
              "
            >
              <h2 className="font-bold text-xl mb-2">
                Why Farm2Kitchen?
              </h2>
              <ul className="space-y-2 text-sm md:text-base text-green-50">
                <li>• Farmers manage products & availability in one place</li>
                <li>• Consumers build flexible subscription boxes</li>
                <li>• Forecasting helps reduce food waste & stock-outs</li>
                <li>• QR codes show full traceability & eco impact</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full py-12 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Smart features for sustainable food chains
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              title="Direct from farmers"
              text="No middlemen. Farmers control products, prices and stock directly in the platform."
            />
            <FeatureCard
              title="Smart forecasting"
              text="Built-in demand forecasting (FR4) using historical subscription data to plan harvests."
            />
            <FeatureCard
              title="Eco impact tracking"
              text="Each order contributes to CO₂ savings and distance reduction, measured automatically (FR5, FR6)."
            />
            <FeatureCard
              title="QR traceability"
              text="Every product can be traced via QR (FR7) showing origin, farmer and eco impact."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:3xl font-bold text-gray-800 mb-6 text-center">
            How Farm2Kitchen works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <StepCard
              number="1"
              title="Farmers sign up"
              text="Farmers register, create their profile and add available seasonal products."
            />
            <StepCard
              number="2"
              title="Consumers subscribe"
              text="Consumers browse products and build their own flexible subscription boxes."
            />
            <StepCard
              number="3"
              title="System forecasts"
              text="The system predicts needed quantities per product and supports sustainable planning."
            />
            <StepCard
              number="4"
              title="Transparent delivery"
              text="Consumers receive boxes with QR codes showing origin and calculated eco impact."
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="w-full py-12 md:py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ready to try the prototype?
          </h2>
          <p className="text-gray-600 mb-6">
            Use this system as a proof-of-concept for your Software Engineering
            project: all data is demo-only, but the flows are realistic and
            aligned with your FR1–FR7 requirements.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="
                bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg
                hover:scale-105 hover:-translate-y-0.5
                transition-transform transition-colors duration-200
              "
            >
              Sign up as Farmer or Consumer
            </Link>
            <Link
              to="/login"
              className="
                border border-green-600 text-green-700 hover:bg-green-50 font-semibold px-6 py-2 rounded-lg
                hover:scale-105 hover:-translate-y-0.5
                transition-transform transition-colors duration-200
              "
            >
              Log in and explore
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div
      className="
        bg-white rounded-xl shadow p-4 
        transition-transform transition-shadow transition-colors duration-300 ease-out
        hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:bg-green-50 
        cursor-pointer
      "
    >
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div
      className="
        bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col h-full
        transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:bg-white 
        cursor-pointer
      "
    >
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-bold mb-3">
        {number}
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

