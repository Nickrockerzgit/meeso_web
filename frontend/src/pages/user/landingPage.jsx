import Header from "../../components/Header";
import { useEffect, useState } from "react";
import ProductSection from "./productSection.jsx";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function LandingPage() {
   const [open, setOpen] = useState(false);
   const [banner, setBanner] = useState(null);
useEffect(() => {
  fetchBanner();
}, []);

const fetchBanner = async () => {
  try {
    const res = await fetch(`${API}/api/banner`);
    const data = await res.json();
    setBanner(data);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
    />
<section className="w-full bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
        <div className="w-full">
          <img
  src={banner?.image_url_1 || "/crosel.webp"}
  alt="Shopping Banner"
  className="w-full h-auto"
/>
        </div>

        {/* Bottom Feature Bar */}
         <div className="bg-white border border-pink-200 rounded-lg mt-2 mx-2 px-3 md:px-6 py-2 md:py-3">

  <div className="flex items-center justify-center text-[11px] md:text-sm text-gray-700 whitespace-nowrap">

    {/* Return */}
    <div className="flex items-center gap-2">
      <span className="text-blue-500 ">↩️</span>
      <span>7 Days Easy Return</span>
    </div>

    {/* Divider */}
    <div className="h-4 w-px bg-gray-300"></div>

    {/* COD */}
    <div className="flex items-center gap-1">
      <span className="text-pink-500">💳</span>
      <span>Cash on Delivery</span>
    </div>

    {/* Divider */}
    <div className="h-4 w-px bg-gray-300"></div>

    {/* Lowest Price */}
    <div className="flex items-center gap-1">
      <span className="text-purple-500">🏷️</span>
      <span>Lowest Prices</span>
    </div>

  </div>

</div>
</section>
<section className="bg-white py-6">
  <div className="max-w-7xl mx-auto px-4">

    <div className="flex gap-6 overflow-y-visible overflow-x-auto no-scrollbar">

      {[
        { name: "Ethnic Wear", img: "/image1.png" },
        { name: "Western Dresses", img: "/image2.png" },
        { name: "Menswear", img: "/image3.png" },
        { name: "Footwear", img: "/image4.png" },
        { name: "Home Decor", img: "/image5.png" },
        { name: "Beauty", img: "/image6.png" },
        { name: "Accessories", img: "/image7.png" },
        { name: "Grocery", img: "/image8.png" },
      ].map((cat, index) => (

        <div
          key={index}
          className="flex flex-col items-center min-w-[90px] cursor-pointer group"
        >

          {/* Category Image */}
          <div className="w-20 h-20 md:w-32 md:h-32 bg-[#f3e5f5] rounded-t-full flex items-end justify-center group-hover:scale-105 transition">

            <img
              src={cat.img}
              alt={cat.name}
              className="h-20 md:h-36 object-contain"
            />

          </div>

          {/* Category Name */}
          <p className="mt-2 text-[12px] md:text-[15px] text-gray-700 font-medium text-center">
            {cat.name}
          </p>

        </div>

      ))}

    </div>

  </div>
</section>
<section className="w-full bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
        <div className="w-full">
          <img
  src={banner?.image_url_2 || "/banner.png"}
  alt="Shopping Banner"
  className="w-full h-auto"
/>
        </div>
</section>
<section className="bg-[#e6e3ea] py-6 overflow-hidden">
  <div className="logo-slider flex gap-8">

    {[
      "/img1.png",
      "/img2.png",
      "/img3.png",
      "/img4.png",
      "/img5.png",
      "/img6.png",
      "/img7.png",
      "/img8.png",

      "/img1.png",
      "/img2.png",
      "/img3.png",
      "/img4.png",
      "/img5.png",
      "/img6.png",
      "/img7.png",
      "/img8.png",
    ].map((logo, index) => (

      <div
        key={index}
        className="w-52 h-24 bg-white rounded-xl flex items-center justify-center
                   shadow-sm hover:shadow-md transition duration-200"
      >
        <img
          src={logo}
          alt="brand"
          className="h-12 object-contain"
        />
      </div>

    ))}

  </div>
</section>
<section
  className="w-full bg-cover bg-center"
  style={{ backgroundImage: "url('/banner2.png')" }}
>

  <div className="max-w-7xl mx-auto px-4 py-6 md:py-0 md:h-[420px] flex flex-col md:flex-row items-center">

    {/* LEFT SIDE */}
    <div className="w-full md:w-1/3 flex justify-center md:justify-start items-center md:items-end md:pl-16 md:pb-16 mb-4 md:mb-0">

      

    </div>


    {/* RIGHT SIDE */}
    <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-evenly gap-4 md:gap-6 items-center">

      {[
        { name: "Trending Now", img: "/banner21.png" },
        { name: "Budget Buys", img: "/banner22.png" },
        { name: "Top Rated Picks", img: "/banner23.png" },
        { name: "Daily Essentials", img: "/banner24.png" },
      ].map((item, index) => (
        
        <div
          key={index}
          className="hover:bg-[#A40E7F] hover:shadow-2xl hover:scale-105 rounded-lg transition duration-300 flex flex-col items-center"
        >

          <img
            src={item.img}
            alt={item.name}
            className="h-24 sm:h-32 md:h-64 object-contain"
          />

          <div className="bg-[#ffe8c2] text-purple-900 mt-1 px-3 md:px-9 py-1 md:py-2 rounded-lg font-bold shadow text-[10px] md:text-base text-center">
            {item.name}
          </div>

        </div>

      ))}

    </div>

  </div>

</section>
<ProductSection />
<footer className="bg-[#f5f5f6] mt-20 border-t">

  {/* TOP SECTION */}
  <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap gap-10 justify-between items-start">

    {/* COLUMN 1 */}
    <div className="w-full sm:w-[320px]">
      <h2 className="text-[28px] font-semibold text-[#353543] mb-4">
        Shop Non-Stop on Meesho
      </h2>

      <p className="text-[#666] text-[14px] mb-6 leading-6">
        Trusted by crores of Indians <br />
        Cash on Delivery
      </p>

      <div className="flex gap-4 flex-wrap">
        <img src="/googleplaystore.png" className="h-10" />
        <img src="/appstore.png" className="h-10" />
      </div>
    </div>

    {/* COLUMN 2 */}
    <div className="flex flex-col gap-3 text-[15px]">
      <h3 className="text-[#353543] font-semibold">Careers</h3>
      <span className="text-[#666] cursor-pointer hover:text-[#353543]">Become a supplier</span>
      <span className="text-[#666] cursor-pointer hover:text-[#353543]">Hall of Fame</span>
      <span className="text-[#666] cursor-pointer hover:text-[#353543]">Sitemap</span>
    </div>

    {/* COLUMN 3 */}
    <div className="flex flex-col gap-3 text-[15px]">
      <h3 className="text-[#353543] font-semibold">Legal and Policies</h3>
      <span className="text-[#666] cursor-pointer hover:text-[#353543]">Meesho Tech Blog</span>
      <span className="text-[#666] cursor-pointer hover:text-[#353543]">Notices and Returns</span>
    </div>

    {/* COLUMN 4 */}
    <div>
      <h3 className="text-[#353543] font-semibold mb-3 text-[15px]">
        Reach out to us
      </h3>

      <div className="flex gap-4 text-[22px] flex-wrap">
        <FaFacebook className="text-blue-600 cursor-pointer" />
        <FaInstagram className="text-pink-500 cursor-pointer" />
        <FaYoutube className="text-red-600 cursor-pointer" />
        <FaLinkedin className="text-blue-700 cursor-pointer" />
        <FaTwitter className="text-blue-400 cursor-pointer" />
      </div>
    </div>

    {/* COLUMN 5 */}
    <div className="w-full sm:w-[300px]">
      <h3 className="text-[#353543] font-semibold mb-3 text-[15px]">
        Contact Us
      </h3>

      <p className="text-[#666] text-[14px] leading-6">
        Meesho Technologies Private Limited <br />
        CIN: U62099KA2024PTC186568 <br />
        3rd Floor, Wing-E, Helios Business Park, <br />
        Kadubeesanahalli Village, Varthur Hobli, <br />
        Outer Ring Road Bellandur, Bangalore <br />
        Karnataka, India, 560103 <br />
        E-mail: query@meesho.com <br />
        © 2015-2026 Meesho.com
      </p>
    </div>

  </div>


  {/* MORE ABOUT MEESHO */}
  <div className="max-w-7xl mx-auto px-6 pb-10">

    {/* BUTTON */}
    <button
      onClick={() => setOpen(!open)}
      className="w-full bg-white border rounded-lg px-10 py-6 flex justify-between items-center text-gray-800 font-semibold"
    >
      More About Meesho
      <span>{open ? "▲" : "▼"}</span>
    </button>

    {/* CONTENT */}
    {open && (
      <div className="bg-white border border-t-0 p-8 text-gray-600 leading-7">

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Discover a World of Affordable Fashion & Everyday Essentials
        </h2>

        <p className="mb-6 text-sm">
          Upgrade your wardrobe and stock your home with the latest trends and essentials at prices designed for everyday value.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Shop Millions of Products Across All Categories
        </h2>

        <p className="mb-6 text-sm">
          From trendy fashion finds to essential homeware, Meesho is your one-stop shop for everything you need.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Latest Women's Fashion Is Right Here
        </h2>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Western Wear for Women
        </h3>

        <p className="mb-6 text-sm">
          Find trendy dresses, casual jeans and comfortable tops suitable for any occasion.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Accessories, Jewellery, and Footwear
        </h3>

        <p className="mb-8 text-sm">
          Choose from a wide selection of jewelry sets, handbags, belts and footwear.
        </p>

        <h2 className="text-pink-600 text-lg font-semibold mb-3">
          Download Meesho App Now
        </h2>

        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          More Than Just Shopping
        </h3>

        <p className="mb-6 text-sm">
          Meesho enables individuals to start their selling journey easily.
        </p>

        <h3 className="text-pink-600 text-lg font-semibold mb-3">
          Online Shopping
        </h3>

        <h4 className="text-gray-800 font-semibold mb-2">
          Baby
        </h4>

        <p className="text-pink-600 text-sm mb-4">
          Baby Blanket | Baby Hanging Cradle | Baby Pillows | Baby Sleeping Bag | Baby Towels
        </p>

        <h4 className="text-gray-800 font-semibold mb-2">
          Electronics & Accessories
        </h4>

        <p className="text-pink-600 text-sm mb-4">
          Android Smart Watches | Bluetooth Earphones | Bluetooth Speakers | Car Mobile Holders | CCTV Cameras | Data Cables | Digital Photo Frames
        </p>

        <h4 className="text-gray-800 font-semibold mb-2">
          Home & Kitchen
        </h4>

        <p className="text-pink-600 text-sm">
          Aprons | Choppers | Chopping Boards | Cookers | Cutlery | Food Processors | Hand Blender | Kitchen Towels | Mixer Grinder | Toaster | Water Bottles
        </p>

      </div>
    )}

  </div>

</footer>


</div>
  );
}
