import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title:
      "Non Transfer Waterproof Longlast Liquid Matte me Beauty Lipstick Combo Pack Of 4",
    price: 91,
    oldPrice: 104,
    discount: "13% off",
    rating: 3.7,
    reviews: 9589,

    images: [
      "/lipstick.png",
      "/lipstick.png",
      "/lipstick.png",
      "/lipstick.png",
    ],
    reviewList: [
      {
        user: "Meesho User",
        rating: 5,
        date: "13 Dec 2025",
        comment:
          "Yah product hamen bahut achcha laga yah mujhe meri mummy ko bahut achcha laga thank u meesho",
        images: ["/review1.png", "/review2.png", "/review3.png"],
        helpful: 94,
      },
      {
        user: "Riya Sharma",
        rating: 4,
        date: "10 Jan 2026",
        comment: "Quality achhi hai aur color bhi same hai.",
        images: ["/review1.png"],
        helpful: 21,
      },
    ],
  },
];

export default function ProductDetails() {
    const navigate = useNavigate();
const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  useEffect(() => {
  if (product) {
    setSelectedImage(product.images[0]);
  }
}, [product]);
  if (!product) {
    return <div className="text-center mt-20 text-xl">Product not found</div>;
  }

  return (
    <section className="bg-[#f5f5f6] py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          {/* IMAGE SECTION */}
<div className="flex flex-col md:flex-row gap-4">

  {/* THUMBNAILS */}
 {/* THUMBNAILS */}
<div className="flex md:flex-col gap-3 order-2 md:order-1 justify-start">
  {product.images.map((img, index) => (
    <img
      key={index}
      src={img}
      onClick={() => setSelectedImage(img)}
      className={`w-16 border rounded cursor-pointer ${
        selectedImage === img ? "border-[#9f2089]" : "border-gray-200"
      }`}
    />
  ))}
</div>

  {/* MAIN IMAGE */}
<div className="flex-1 border border-[#e6e6e6] rounded-md bg-white p-4 order-1 md:order-2">
  <img
    src={selectedImage}
    alt="product"
    className="w-full object-contain"
  />
</div>

</div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 border border-[#9f2089] text-[#9f2089] py-3 rounded-md font-medium text-[15px] hover:bg-[#fdf3fb]">
              Add to Cart
            </button>

            <button 
            onClick={() => navigate(`/phone/${product.id}`)}
            className="flex-1 bg-[#9f2089] text-white py-3 rounded-md font-medium text-[15px] hover:bg-[#8b1c78]">
              Buy Now
            </button>
          </div>

          {/* SIMILAR PRODUCTS */}
          <div className="mt-10">
            <h2 className="text-[18px] font-semibold text-[#353543] mb-4">
              1 Similar Products
            </h2>

            <div className="w-28 border border-[#e6e6e6] p-2 rounded-md bg-white">
              <img src={product.images[0]} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* PRODUCT DETAILS */}
          <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
            <h1 className="text-[18px] text-[#353543] font-medium leading-6">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-[28px] font-semibold text-[#353543]">
                ₹{product.price}
              </span>

              <span className="line-through text-[#8b8ba3] text-[14px]">
                ₹{product.oldPrice}
              </span>

              <span className="text-[#038d63] text-[14px] font-medium">
                {product.discount}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="bg-[#038d63] text-white text-[12px] px-2 py-[2px] rounded">
                {product.rating} ★
              </span>

              <span className="text-[#666] text-[13px]">
                {product.reviews} Ratings
              </span>
            </div>

            <span className="bg-[#f2f2f2] text-[#666] px-3 py-1 rounded-full text-[12px] mt-3 inline-block">
              Free Delivery
            </span>
          </div>

          {/* SIZE */}
          <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
            <h2 className="font-semibold mb-3 text-[#353543]">Select Size</h2>

            <button className="border border-[#9f2089] text-[#9f2089] px-4 py-2 rounded-full text-sm">
              Free Size
            </button>
          </div>

          {/* PRODUCT HIGHLIGHTS */}
          <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
            <h2 className="font-semibold mb-4 text-[#353543]">
              Product Highlights
            </h2>

            <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
              <div>
                <p className="text-gray-400">Flavour</p>
                <p>No Flavour</p>
              </div>

              <div>
                <p className="text-gray-400">Color</p>
                <p>Multicolor</p>
              </div>

              <div>
                <p className="text-gray-400">Generic Name</p>
                <p>Liquid Lipstick</p>
              </div>
            </div>
          </div>

          {/* SOLD BY SECTION */}
<div className="border border-[#e6e6e6] rounded-xl bg-white p-5">

  <h2 className="text-[16px] font-semibold text-[#353543] mb-5">
    Sold By
  </h2>

  <div className="flex justify-between items-start">

    {/* LEFT SIDE */}
    <div className="flex gap-4">

      {/* ICON */}
      <div className="w-[56px] h-[56px] bg-[#f2f3f4] rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          stroke="#6c8bd8"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
        >
          <path d="M3 9l1-4h16l1 4" />
          <path d="M5 9v10h14V9" />
          <path d="M9 19v-6h6v6" />
        </svg>
      </div>

      {/* DETAILS */}
      <div>

        {/* STORE NAME */}
        <p className="text-[15px] font-medium text-[#353543]">
          FusionDeals
        </p>

        {/* STATS */}
        <div className="flex gap-7 mt-2">

          {/* RATING */}
         <div>
  <span className="inline-flex items-center gap-1 text-[16px] text-[#4a72c2] bg-[#edf2ff] px-3 py-[2px] rounded-full font-medium whitespace-nowrap">
    3.9
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="#4a72c2"
      viewBox="0 0 24 24"
    >
      <path d="M12 17.3l6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  </span>

  <p className="text-[15px] text-[#8b8ba3] mt-1">
    11,984 Ratings
  </p>
</div>

          {/* FOLLOWERS */}
          <div>
            <p className="text-[16px] font-medium text-[#353543]">
              41
            </p>

            <p className="text-[15px] text-[#8b8ba3]">
              Followers
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            <p className="text-[16px] font-medium text-[#353543]">
              46
            </p>

            <p className="text-[15px] text-[#8b8ba3]">
              Products
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* BUTTON */}
    <button className="border border-[#9f2089] text-[#9f2089] px-4 py-2 rounded-md text-[13px] font-medium whitespace-nowrap hover:bg-[#fdf3fb]">
      View Shop
    </button>

  </div>

</div>

          {/* RATINGS */}
          <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
            

            <div className="flex flex-col md:flex-row gap-8">


              
            </div>

            <hr className="my-6" />

            {/* REVIEW */}
            <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">

  <h2 className="font-semibold mb-6 text-[#353543] text-[16px]">
    Product Ratings & Reviews
  </h2>

  <div className="grid grid-cols-[120px_1fr] gap-6 items-center">

    {/* LEFT RATING */}
    <div className="text-center">

      <div className="flex items-center justify-center gap-1 text-[#038d63]">
        <span className="text-[44px] font-semibold">{product.rating}</span>
        <span className="text-[22px]">★</span>
      </div>

      <p className="text-[12px] text-[#8b8ba3] mt-1">
        {product.reviews} Ratings,<br/>
        3203 Reviews
      </p>

    </div>

    {/* RIGHT BARS */}
    <div className="space-y-3">

      {[
        {label:"Excellent", value:70, count:5534, color:"bg-green-500"},
        {label:"Very Good", value:35, count:1146, color:"bg-green-400"},
        {label:"Good", value:20, count:929, color:"bg-yellow-400"},
        {label:"Average", value:10, count:390, color:"bg-orange-400"},
        {label:"Poor", value:25, count:1590, color:"bg-red-500"}
      ].map((item,i)=>(
        <div key={i} className="flex items-center gap-3 text-[13px]">

          <span className="w-[80px] text-[#353543]">
            {item.label}
          </span>

          <div className="flex-1 h-[6px] bg-gray-200 rounded">
            <div
              className={`${item.color} h-[6px] rounded`}
              style={{width:`${item.value}%`}}
            />
          </div>

          <span className="text-[#8b8ba3] w-[40px] text-right">
            {item.count}
          </span>

        </div>
      ))}

    </div>

  </div>

  <hr className="my-6" />

  {/* REVIEW CARD */}
  <div className="space-y-6">

  {product.reviewList.map((review, index) => (

    <div key={index}>

      {/* USER */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <p className="text-[14px] font-medium text-[#353543]">
          {review.user}
        </p>
      </div>

      {/* RATING */}
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-[#038d63] text-white text-[12px] px-2 py-[2px] rounded">
          {review.rating} ★
        </span>

        <span className="text-gray-400 text-xs">
          Posted on {review.date}
        </span>
      </div>

      {/* COMMENT */}
      <p className="text-gray-600 text-sm">
        {review.comment}
      </p>

      {/* REVIEW IMAGES */}
      <div className="flex gap-3 mt-3">
        {review.images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-16 h-16 rounded object-cover"
          />
        ))}
      </div>

      {/* HELPFUL */}
      <p className="text-[#666] text-[13px] mt-2">
        👍 Helpful ({review.helpful})
      </p>

    </div>

  ))}

  <button className="text-[#9f2089] font-medium text-sm">
    VIEW ALL REVIEWS →
  </button>

</div>

</div>
          </div>

          {/* BENEFITS BAR */}
          <div className="bg-[#e8e8f1] rounded-lg p-5 grid grid-cols-3 items-center text-center">

  {/* LOWEST PRICE */}
  <div className="flex flex-col items-center gap-2">
    <div className="text-2xl">🏷️</div>
    <p className="text-[13px] text-[#353543]">Lowest Price</p>
  </div>

  {/* CASH ON DELIVERY */}
  <div className="flex flex-col items-center gap-2 border-x border-[#d6d6dc]">
    <div className="text-2xl">💰</div>
    <p className="text-[13px] text-[#353543]">Cash on Delivery</p>
  </div>

  {/* RETURNS */}
  <div className="flex flex-col items-center gap-2">
    <div className="text-2xl">📦</div>
    <p className="text-[13px] text-[#353543]">7-day Returns</p>
  </div>

</div>
        </div>
      </div>
    </section>
  );
}
