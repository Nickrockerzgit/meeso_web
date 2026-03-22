import { useNavigate } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";

const API = import.meta.env.VITE_API_URL||"http://localhost:5000";

const ProductSection = forwardRef((props, ref) => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {

    const res = await fetch(`${API}/api/products`);
    const data = await res.json();

    const formattedProducts = data.map((p) => ({
      id: p.id,
      title: p.product_detail,
      price: p.price,
      oldPrice: p.old_price,
      rating: p.rating,
      reviews: p.total_reviews,
      image: p.image_url_1
    }));

    setProducts(formattedProducts);

  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

return (
  <section ref={ref} className="w-full px-3 md:px-12 py-6 md:py-10 bg-gray-50">

    {/* GRID */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8"
    
    >

      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-white rounded-xl p-2 md:p-4 shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
        >

          {/* IMAGE */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-44 md:h-64 object-cover rounded-lg"
          />

          {/* TITLE */}
          <h3 className="text-[14px] md:text-[16px] text-gray-700 mt-2 font-medium line-clamp-2">
            {product.title}
          </h3>

          {/* PRICE */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg md:text-2xl font-bold text-black">
              ₹{product.price}
            </span>

            {product.oldPrice && (
              <span className="line-through text-gray-400 text-xs md:text-[16px]">
                ₹{product.oldPrice}
              </span>
            )}

            {product.discount && (
              <span className="text-green-600 text-xs md:text-[16px] font-medium">
                {product.discount}
              </span>
            )}
          </div>

          {/* DELIVERY */}
          <div className="mt-1 rounded">
            <span className="bg-gray-100 text-xs px-2 py-1 rounded-md">
              Free Delivery
            </span>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-xs md:text-[16px] px-2 py-1 rounded-md flex items-center">
              {product.rating} ★
            </span>

            <span className="text-xs md:text-[16px] text-gray-500">
              {product.reviews} Reviews
            </span>
          </div>

        </div>
      ))}

    </div>

  </section>
);
});

export default ProductSection;