import React, { useState,useEffect } from "react";
import { MapPin } from "lucide-react";
import { Truck } from 'lucide-react';
import {useLocation, useNavigate,useParams } from "react-router-dom";

export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [address, setAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    house: "",
    road: "",
    pincode: "",
    city: "",
    state: ""
  });
  const phone = location.state?.phone;

  useEffect(() => {

  const fetchProduct = async () => {

    try {

      const res = await fetch(`http://localhost:5000/api/products/${id}`);

      const data = await res.json();

      setProduct(data);

    } catch (error) {
      console.log(error);
    }

  };

  fetchProduct();

}, [id]);
const goToPayment = () => {
 console.log("pro",product);
  navigate("/paymentPage", {
    state: {
      phone: phone,
      product: product
    }
  });

};
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveAddress = () => {
    setAddress(formData);
    setOpenAddress(false);
  };

  return (
    <div className="min-h-screen bg-white ">
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
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full  border-2 border-blue-600 flex items-center justify-center text-[10px] md:text-xs text-blue-600">
          1
        </div>

        {/* LINE */}
        <div className="w-20 md:w-40 h-[2px] bg-gray-300"></div>

        {/* STEP 2 */}
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-[10px] md:text-xs text-gray-300 bg-white">
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
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-8 px-4">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* PRODUCT DETAILS */}
          <div >

            <h2 className="font-semibold text-lg mb-4">
              Product Details
            </h2>
{product && (
            <div className="border rounded-lg">

             <div className="p-3 border-b text-sm font-medium flex items-center gap-2 whitespace-nowrap">
  <Truck size={16} />
  Estimated Delivery by Thursday, 19th Mar
</div>

              <div className="flex gap-4 p-4">

                <img
                  src={product.image_url_1}
                  className="w-16 h-20"
                />

                <div className="flex-1">

                  <h3 className="text-sm font-medium">
                   {product.product_detail}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">

                    <span className=" font-semibold">
                      ₹{product.price}
                    </span>

                    <span className="line-through text-gray-400 text-sm">
                      ₹{product.old_price}
                    </span>

                    <span className="text-green-600 text-xs">
                      {Math.round(((product.old_price - product.price) / product.old_price) * 100)}% Off
                    </span>

                    <span className="text-xs bg-orange-100 text-orange-600 px-2 rounded">
                      01h : 49m : 50s
                    </span>

                  </div>

                  <p className="text-sm  mt-2 font-semibold">
                    Size: Free Size • Qty: 1
                  </p>

                </div>

                <button
                  className="text-[#9f2089] font-medium text-sm"
                >
                  EDIT
                </button>

              </div>

              <div className="border-t px-4 py-3 flex justify-between text-sm text-gray-600">
                <span>Sold by: {product.shop_name}</span>
                <span>Free Delivery</span>
              </div>

            </div>
)}
          </div>


          {/* DELIVERY ADDRESS */}
          {address && (

            <div >

              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin size={18} strokeWidth={2.25} className="text-blue-500" /> Delivery Address
            
              </h2>

              <div className="border rounded-lg p-4 flex justify-between">

                <div>

                  <p className="font-semibold">
                    {address.name}
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    {address.house}, {address.road}, {address.city}, {address.state} - {address.pincode}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {address.phone}
                  </p>

                </div>

                <button
                  onClick={() => setOpenAddress(true)}
                  className="text-[#9f2089] font-medium"
                >
                  CHANGE
                </button>

              </div>

            </div>

          )}

        </div>


        {/* RIGHT SIDE */}
        <div className="bg-white border rounded-lg p-6 h-fit">

          <h2 className="font-semibold text-lg mb-4">
            Price Details (1 Items)
          </h2>

          <div className="flex justify-between text-sm mb-2">
            <span className="underline decoration-dotted">Product Price</span>
            <span>+ ₹108</span>
          </div>

          <div className="flex justify-between text-sm text-green-600 mb-4">
            <span className="underline decoration-dotted">Total Discounts</span>
            <span>- ₹17</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Order Total</span>
            <span>₹91</span>
          </div>

          <div className="bg-green-100 text-green-700 p-3 rounded text-sm mt-4">
            Yay! Your total discount is ₹17
          </div>

          <div className="bg-gray-100 text-gray-600 text-xs p-3 rounded mt-4 text-center">
            Clicking on 'Continue' will not deduct any money
          </div>

          {!address && (
            <button
              onClick={() => setOpenAddress(true)}
              className="w-full bg-[#9f2089] text-white py-3 rounded-lg font-semibold mt-4"
            >
              Select Delivery Address
            </button>
          )}

          {address && (
            <button 
            onClick={goToPayment}
            className="w-full bg-[#9f2089] text-white py-3 rounded-lg font-semibold mt-4">
              Continue
            </button>
          )}

        </div>

      </div>


      {/* BLUR BACKGROUND */}
      {(openAddress || openEdit) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}


      {/* ADD ADDRESS DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 w-full sm:w-[420px] transition-transform duration-300 overflow-y-auto
        ${openAddress ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="flex items-center gap-3 p-4 border-b">

          <button
            onClick={() => setOpenAddress(false)}
            className="text-xl"
          >
            ←
          </button>

          <h2 className="font-semibold">
            ADD DELIVERY ADDRESS
          </h2>

        </div>


        <div className="p-4 space-y-5">

          <input
            name="name"
            onChange={handleChange}
            placeholder="Name"
            className="w-full border-b py-2 outline-none text-sm"
          />

          <input
            name="phone"
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full border-b py-2 outline-none text-sm"
          />

          <input
            name="house"
            onChange={handleChange}
            placeholder="House no. / Building name"
            className="w-full border-b py-2 outline-none text-sm"
          />

          <input
            name="road"
            onChange={handleChange}
            placeholder="Road name / Area / Colony"
            className="w-full border-b py-2 outline-none text-sm"
          />

          <input
            name="pincode"
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full border-b py-2 outline-none text-sm"
          />

          <div className="flex gap-4">

            <input
              name="city"
              onChange={handleChange}
              placeholder="City"
              className="w-1/2 border-b py-2 outline-none text-sm"
            />

            <input
              name="state"
              onChange={handleChange}
              placeholder="State"
              className="w-1/2 border-b py-2 outline-none text-sm"
            />

          </div>

        </div>


        <div className="p-4 border-t sticky bottom-0 bg-white">

          <button
            onClick={saveAddress}
            className="w-full bg-[#9f2089] text-white py-3 rounded-lg font-semibold"
          >
            Save Address and Continue
          </button>

        </div>

      </div>

    </div>
  );
}