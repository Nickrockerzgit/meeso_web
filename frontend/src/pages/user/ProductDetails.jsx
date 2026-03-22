import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductSection from "./ProductSection";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sizes = ["X", "M", "L", "XL", "XXL", "XXXL"];

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("L");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/api/products/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      const formattedProduct = {
        ...data,
        title: data.product_detail || "Product Title",
        oldPrice: data.old_price,
        reviews: data.total_reviews || 0,
        images: [data.image_url_1, data.image_url_2, data.image_url_3, data.image_url_4]
          .filter(Boolean),
        discount:
          data.old_price && data.price
            ? Math.round(((data.old_price - data.price) / data.old_price) * 100) + "% off"
            : null,
        reviewList: (data.reviews || []).map((r) => ({
          user: r.reviewerName || "Anonymous",
          rating: r.rating || 0,
          comment: r.comment || "",
          date: r.created_at ? new Date(r.created_at).toLocaleDateString() : "",
          helpful: r.helpful || 0,
          images: r.reviewImageUrl ? [r.reviewImageUrl] : [],
        })),
      };

      setProduct(formattedProduct);
      if (formattedProduct.images.length > 0) {
        setSelectedImage(formattedProduct.images[0]);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading product...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Error: {error}
        <br />
        <button
          onClick={fetchProduct}
          className="mt-4 px-6 py-2 bg-[#9f2089] text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-20 text-xl">Product not found</div>;
  }

  return (
    <><section className="bg-[#f5f5f6] py-10 px-4 md:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE – Images + Buttons + Similar */}
        <div className="space-y-8">
          {/* IMAGE SECTION */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* THUMBNAILS */}
            <div className="flex md:flex-col gap-3 order-2 md:order-1 justify-start">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 object-cover border-2 rounded cursor-pointer transition-all ${selectedImage === img
                      ? "border-[#9f2089] scale-105"
                      : "border-gray-200 hover:border-gray-400"}`} />
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 border border-[#e6e6e6] rounded-md bg-white p-4 order-1 md:order-2">
              <img
                src={selectedImage || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-auto max-h-[500px] object-contain mx-auto" />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button className="flex-1 border border-[#9f2089] text-[#9f2089] py-3.5 rounded-md font-medium text-[15px] hover:bg-[#fdf3fb] transition">
              Add to Cart
            </button>

            <button
              onClick={() => navigate(`/phone/${product.id}`, { state: { selectedSize } })}
              className="flex-1 bg-[#9f2089] text-white py-3.5 rounded-md font-medium text-[15px] hover:bg-[#8b1c78] transition"
            >
              Buy Now
            </button>
          </div>

          {/* SIMILAR PRODUCTS (placeholder – extend later) */}
          <div>
            <h2 className="text-[18px] font-semibold text-[#353543] mb-4">
              Similar Products
            </h2>
            <div className="w-28 border border-[#e6e6e6] p-2 rounded-md bg-white">
              <img
                src={product.images[0] || "/placeholder.jpg"}
                alt="similar"
                className="w-full object-cover" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – Details */}
        <div className="space-y-6">
          {/* PRODUCT TITLE & PRICE */}
          <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
            <h1 className="text-[18px] md:text-[22px] text-[#353543] font-medium leading-7">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <span className="text-[28px] font-semibold text-[#353543]">
                ₹{product.price}
              </span>
              {product.oldPrice && (
                <>
                  <span className="line-through text-[#8b8ba3] text-[15px]">
                    ₹{product.oldPrice}
                  </span>
                  <span className="text-[#038d63] text-[14px] font-medium">
                    {product.discount}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="bg-[#038d63] text-white text-[12px] px-2.5 py-1 rounded">
                {product.rating || "?"} ★
              </span>
              <span className="text-[#666] text-[13px]">
                {product.reviews} Ratings
              </span>
            </div>

            <span className="bg-[#f2f2f2] text-[#666] px-3 py-1 rounded-full text-[12px] mt-3 inline-block">
              Free Delivery
            </span>
          </div>

          {/* SIZE SELECTOR */}
          <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
            <h2 className="font-semibold mb-4 text-[#353543]">Select Size</h2>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    min-w-[48px] px-5 py-2.5 text-sm font-medium rounded-full
                    transition-all duration-200 border
                    ${selectedSize === size
                      ? "border-[#9f2089] bg-[#fdeaf7] text-[#9f2089] shadow-sm"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-[#fdeaf7] hover:border-[#d972c2] hover:text-[#9f2089]"}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* HIGHLIGHTS */}
          {product.highlights && Object.keys(product.highlights).length > 0 && (
            <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
              <h2 className="font-semibold mb-4 text-[#353543]">Product Highlights</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
                {Object.entries(product.highlights).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-gray-400 capitalize">{key}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOLD BY */}
          <div className="border border-[#e6e6e6] rounded-xl bg-white p-5">
            <h2 className="text-[16px] font-semibold text-[#353543] mb-5">Sold By</h2>
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-[#f2f3f4] rounded-full flex items-center justify-center shrink-0">
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

                <div>
                  <p className="text-[15px] font-medium text-[#353543]">
                    {product.shop_name || "Seller"}
                  </p>
                  <div className="flex gap-6 mt-2 flex-wrap">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[15px] text-[#4a72c2] bg-[#edf2ff] px-3 py-0.5 rounded-full font-medium">
                        {product.shop_rating || "?"}
                        <svg width="12" height="12" fill="#4a72c2" viewBox="0 0 24 24">
                          <path d="M12 17.3l6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </span>
                      <p className="text-[13px] text-[#8b8ba3] mt-1">
                        {product.shop_total_rating || 0} Ratings
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-[#353543]">
                        {product.shop_followers || 0}
                      </p>
                      <p className="text-[13px] text-[#8b8ba3]">Followers</p>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-[#353543]">
                        {product.shop_total_products || 0}
                      </p>
                      <p className="text-[13px] text-[#8b8ba3]">Products</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="border border-[#9f2089] text-[#9f2089] px-5 py-2 rounded-md text-[13px] font-medium hover:bg-[#fdf3fb] transition whitespace-nowrap">
                View Shop
              </button>
            </div>
          </div>

          {/* RATINGS & REVIEWS */}
          <div className="border border-[#e6e6e6] rounded-md p-5 bg-white">
            <h2 className="font-semibold mb-6 text-[#353543] text-[16px]">
              Product Ratings & Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-start">
              {/* Average Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-[#038d63]">
                  <span className="text-[44px] font-semibold">{product.rating || "?"}</span>
                  <span className="text-[24px]">★</span>
                </div>
                <p className="text-[12px] text-[#8b8ba3] mt-2">
                  {product.reviews || 0} Ratings
                  <br />
                  {/* You can add real review count if available */}
                </p>
              </div>

              {/* Rating Bars (static example – replace with real data later) */}
              <div className="space-y-3">
                {[
                  { label: "Excellent", value: 70, count: 5534, color: "bg-green-500" },
                  { label: "Very Good", value: 35, count: 1146, color: "bg-green-400" },
                  { label: "Good", value: 20, count: 929, color: "bg-yellow-400" },
                  { label: "Average", value: 10, count: 390, color: "bg-orange-400" },
                  { label: "Poor", value: 25, count: 1590, color: "bg-red-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[13px]">
                    <span className="w-20 text-[#353543]">{item.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`${item.color} h-full`}
                        style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="text-[#8b8ba3] w-10 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Individual Reviews */}
            {product.reviewList?.length > 0 ? (
              <div className="space-y-8">
                {product.reviewList.map((review, index) => (
                  <div key={index} className="pb-6 border-b last:border-b-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-gray-200 rounded-full" />
                      <p className="text-[14px] font-medium text-[#353543]">
                        {review.user}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#038d63] text-white text-[11px] px-2 py-0.5 rounded">
                        {review.rating} ★
                      </span>
                      <span className="text-gray-400 text-xs">
                        {review.date || "N/A"}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {review.comment}
                    </p>

                    {review.images?.length > 0 && (
                      <div className="flex gap-3 mt-4 flex-wrap">
                        {review.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="review"
                            className="w-16 h-16 rounded object-cover border" />
                        ))}
                      </div>
                    )}

                    <p className="text-[#666] text-[13px] mt-3">
                      👍 Helpful ({review.helpful})
                    </p>
                  </div>
                ))}

                <button className="text-[#9f2089] font-medium text-sm hover:underline">
                  VIEW ALL REVIEWS →
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">No reviews yet.</p>
            )}
          </div>

          {/* BENEFITS BAR */}
          <div className="bg-[#e8e8f1] rounded-lg p-5 grid grid-cols-3 items-center text-center text-[13px] gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl">🏷️</div>
              <p className="text-[#353543]">Lowest Price</p>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-[#d6d6dc]">
              <div className="text-3xl">💰</div>
              <p className="text-[#353543]">Cash on Delivery</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl">📦</div>
              <p className="text-[#353543]">7-day Returns</p>
            </div>
          </div>
        </div>
      </div>
    </section><ProductSection /></>
  );
}