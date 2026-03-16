
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const phone = location.state?.phone;
  const product = location.state?.product;
  const price = product?.price || 0;
const oldPrice = product?.old_price || 0;

const discount = Math.round(oldPrice - price);
const orderTotal = price;
  const [cardNo, setCardNo] = useState("");
const [expMonth, setExpMonth] = useState("");
const [expYear, setExpYear] = useState("");
const [cvv, setCvv] = useState("");
  const [payment, setPayment] = useState("online");
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardVerified, setCardVerified] = useState(false);
  const [cardSelected, setCardSelected] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [showCodModal, setShowCodModal] = useState(false);
  const [resell, setResell] = useState("no");

  const saveCard = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/user-cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_no: phone, // user phone
        card_no: cardNo,
        exp_month: expMonth,
        exp_year: expYear,
        cvv: cvv,
      }),
    });

    const data = await res.json();
    console.log("Card saved:", data);

    setCardVerified(true);
    setShowCardForm(false);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
{/* HEADER */}
<div className="bg-white border-b">
  <div className="max-w-6xl mx-auto relative flex items-center py-4 px-4 md:px-6">

    {/* LOGO (left) */}
    <h1 className="text-[24px] md:text-[32px] font-bold text-[#9f2089]">
      meesho
    </h1>

    {/* CENTER STEPPER */}
    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">

      {/* circles + line */}
      <div className="flex items-center">

        {/* STEP 1 */}
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-600 border-2 border-blue-600 flex items-center justify-center text-[10px] md:text-xs text-white">
          ✓
        </div>

        {/* LINE */}
        <div className="w-20 md:w-40 h-[2px] bg-gray-300"></div>

        {/* STEP 2 */}
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-blue-600 flex items-center justify-center text-[10px] md:text-xs text-blue-600 bg-white">
          2
        </div>

      </div>

      {/* LABELS */}
      <div className="flex justify-between w-28 md:w-48 mt-1 text-[10px] md:text-xs">
        <span className="text-blue-600">Review</span>
        <span className="text-gray-400">Payment</span>
      </div>

    </div>

  </div>
</div>


      {/* MAIN */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.7fr_1px_1fr] gap-8 mt-8 px-4">

        {/* LEFT */}
        <div className="space-y-6">

          <h2 className="text-lg font-semibold">
            Select Payment Method
          </h2>


          {/* COD */}
          <div
            onClick={() => {
              setPayment("cod");
              setShowCodModal(true);
            }}
            className={`border rounded-xl p-5 cursor-pointer flex items-center justify-between shadow-sm
            ${payment === "cod"
              ? "border-[#9f2089] shadow-md"
              : "border-gray-200"}`}
          >

            <div className="flex items-center gap-6">

              <span className="text-xl font-semibold">
                ₹{orderTotal}
              </span>

              <div className="w-[1px] h-6 bg-gray-300"></div>

              <p className="font-medium text-gray-800">
                Cash on Delivery
              </p>

            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center
              ${payment === "cod"
                ? "border-[#9f2089] bg-[#9f2089] text-white"
                : "border-gray-300"}`}
            >
              {payment === "cod" && "✓"}
            </div>

          </div>



          {/* PAY ONLINE */}
          <div
            onClick={() => setPayment("online")}
            className={`border rounded-lg
            ${payment === "online" ? "border-[#9f2089]" : "border-gray-200"}`}
          >

            <div className="flex items-center justify-between p-5 cursor-pointer">

              <div className="flex items-center gap-6">

                <div>
                  <p className="text-gray-400 line-through text-sm">₹{orderTotal}</p>
                  <p className="text-green-600 font-semibold text-lg">₹{orderTotal-33}</p>
                  <span className="text-xs bg-green-100 px-2 py-1 rounded text-green-700">
                    Save ₹33
                  </span>
                </div>

                <p className="font-medium">Pay Online</p>

              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center
                ${payment === "online"
                  ? "border-[#9f2089] bg-[#9f2089] text-white"
                  : "border-gray-300"}`}
              >
                {payment === "online" && "✓"}
              </div>

            </div>


            {/* ONLINE OPTIONS */}
            {payment === "online" && (

              <div className="border-t">

                {/* BANK OFFER */}
                <div className="bg-gray-100 px-5 py-3 text-sm text-gray-600 flex justify-between">
                  <span>Extra discount with bank offers</span>
                  <span className="text-green-600 cursor-pointer">
                    View Offers
                  </span>
                </div>


                {/* UPI */}
                <div className="px-5 py-4 border-t flex justify-between cursor-pointer">
                  <span>Pay by any UPI App</span>
                  <span className="text-green-600 text-sm">
                    Offers Available
                  </span>
                </div>


                {/* WALLET */}
                <div className="px-5 py-4 border-t flex justify-between cursor-pointer">
                  <span>Wallet</span>
                  <span className="text-green-600 text-sm">
                    Offers Available
                  </span>
                </div>


                {/* CARD */}
                <div
                  onClick={() => setShowCardForm(!showCardForm)}
                  className="px-5 py-4 border-t flex justify-between cursor-pointer"
                >
                  <span>Debit/Credit Cards</span>
                  <span>{showCardForm ? "▲" : "▼"}</span>
                </div>


                {/* CARD FORM */}
                {showCardForm && !cardVerified && (

                  <div className="px-5 pb-6">

                    <h3 className="font-semibold text-lg mt-4">
                      Enter your card details
                    </h3>

                    <input
  placeholder="Enter Card Number"
  value={cardNo}
  onChange={(e) => setCardNo(e.target.value)}
  className="w-full border-b py-3 mt-4 outline-none"
/>

                    <div className="flex gap-6 mt-6">

                      <input
  placeholder="MM"
  value={expMonth}
  onChange={(e) => setExpMonth(e.target.value)}
  className="w-1/2 border-b py-3 outline-none"
/>

                     <input
  placeholder="YY"
  value={expYear}
  onChange={(e) => setExpYear(e.target.value)}
  className="w-1/2 border-b py-3 outline-none"
/>

                    </div>

                   <input
  placeholder="CVV"
  value={cvv}
  onChange={(e) => setCvv(e.target.value)}
  className="w-full border-b py-3 mt-6 outline-none"
/>

                    <p className="text-xs text-gray-500 mt-1">
                      3-digit code behind your card
                    </p>

                    <div className="flex justify-end gap-3 mt-6">

                      <button
                        onClick={() => setShowCardForm(false)}
                        className="border border-[#9f2089] text-[#9f2089] px-4 py-2 rounded"
                      >
                        Cancel
                      </button>

                      <button
  onClick={saveCard}
  className="bg-[#9f2089] text-white px-4 py-2 rounded"
>
  Verify
</button>

                    </div>

                  </div>

                )}


                {/* SAVED CARD */}
                {cardVerified && (

                  <div className="px-5 py-4 border-t flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="w-10 h-6 bg-blue-200 rounded"></div>

                      <div>
                        <p className="font-medium">
                          STRIPE Credit Card
                        </p>

                        <p className="text-gray-500 text-sm">
                          4242-42XX-XXXX-XXXX
                        </p>
                      </div>

                    </div>

                    <input
                      type="radio"
                      checked={cardSelected}
                      onChange={() => setCardSelected(true)}
                      className="w-4 h-4 accent-[#9f2089]"
                    />

                  </div>

                )}


                {/* NET BANKING */}
                <div
                  onClick={() => setShowNetBanking(!showNetBanking)}
                  className="px-5 py-4 border-t flex justify-between cursor-pointer"
                >
                  <span>Net Banking</span>
                  <span>{showNetBanking ? "▲" : "▼"}</span>
                </div>

              </div>

            )}

          </div>



          {/* RESELL */}
          <div className="border rounded-lg p-5 flex items-center justify-between">

            <div>
              <p className="font-medium">
                Reselling the order?
              </p>

              <p className="text-sm text-gray-500">
                Click on 'Yes' to add Final Price
              </p>
            </div>


            <div className="flex gap-3">

              <button
                onClick={() => setResell("no")}
                className={`px-5 py-2 rounded-full border
                ${resell === "no"
                  ? "bg-pink-100 border-[#9f2089] text-[#9f2089]"
                  : "border-gray-300 text-gray-600"}`}
              >
                No
              </button>

              <button
                onClick={() => setResell("yes")}
                className={`px-5 py-2 rounded-full border
                ${resell === "yes"
                  ? "bg-pink-100 border-[#9f2089] text-[#9f2089]"
                  : "border-gray-300 text-gray-600"}`}
              >
                Yes
              </button>

            </div>

          </div>

        </div>


        {/* DIVIDER */}
        <div className="hidden md:block bg-gray-200 w-[1px]"></div>


        {/* RIGHT SIDE */}
        <div className="bg-white border rounded-lg p-6 h-fit">

          <h2 className="font-semibold mb-4 text-lg">
            Price Details (1 Items)
          </h2>

          <div className="flex justify-between text-sm mb-2">
            <span className="underline decoration-dotted">Product Price</span>
            <span>+ ₹{oldPrice}</span>
          </div>

          <div className="flex justify-between text-sm text-green-600 mb-4">
            <span className="underline decoration-dotted">Total Discounts</span>
            <span>- ₹{discount}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Order Total</span>
            <span>₹{orderTotal}</span>
          </div>

          <div className="bg-green-100 text-green-700 text-sm p-3 rounded mt-4">
            Yay! Your total discount is ₹{discount}
          </div>

          <button className="w-full bg-[#9f2089] text-white py-3 rounded-lg font-semibold mt-4">
            {cardSelected ? "Pay Now" : "Place Order"}
          </button>

        </div>

      </div>


      {/* COD MODAL */}
      {showCodModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">

            <div className="w-16 h-16 rounded-xl bg-[#9f2089] text-white flex items-center justify-center text-3xl font-bold">
              m
            </div>

            <p className="mt-4 text-gray-600 text-sm">
              Cash on Delivery Selected
            </p>
            
            <button
              onClick={() => setShowCodModal(false)}
              className="mt-6 bg-[#9f2089] text-white px-6 py-2 rounded-lg"
            >
              Continue
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

