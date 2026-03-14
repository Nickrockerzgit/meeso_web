import React from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterNumber() {
  const navigate = useNavigate();
  return (
<div className="min-h-screen bg-[#fdeef6] flex items-center justify-center px-4">

  <div className="bg-white rounded-xl mt-10 w-full max-w-[400px] overflow-hidden shadow-md">



        {/* TOP BANNER */}
        <div className="relative bg-gradient-to-r from-[#d63384] to-[#9f2089] h-48 flex items-center px-6">
     <img src="/image.png" alt="" className="rounded-md"/>

        </div>

        {/* FORM SECTION */}
        <div className="p-6">

          <h2 className="text-lg font-semibold text-[#353543] mt-4 mb-10">
            Sign Up to save your order
          </h2>

          {/* PHONE INPUT */}
          <div className="space-y-1 mb-10">

            <p className="text-xs text-gray-500">Country</p>

            <div className="flex items-center border-b border-gray-300 pb-2 gap-4">

              <span className="font-medium text-sm text-[#353543]">
                IN +91
              </span>

              <input
                type="text"
                placeholder="Phone Number"
                className="flex-1 outline-none text-gray-700"
              />

            </div>

          </div>

          {/* BUTTON */}
          <button 
          onClick={() => navigate(`/address/${1}`)}
          className="w-full mt-2 bg-[#9f2089] hover:bg-[#8b1c78] text-white py-3 rounded-md font-semibold">
            Continue
          </button>

        </div>

        {/* TERMS */}
        <div className="text-center text-xs mt-40 text-gray-500 pb-6 px-6">

          By continuing, you agree to Meesho's
          <span className="text-[#9f2089] font-medium"> Terms & Conditions </span>
          and
          <span className="text-[#9f2089] font-medium"> Privacy Policy</span>

        </div>

      </div>

    </div>
  );
}