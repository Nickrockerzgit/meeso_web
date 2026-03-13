import { useNavigate } from "react-router-dom";


const products = [
  {
    id: 1,
    title: "Sensational Stylish Lipsticks",
    price: 91,
    oldPrice: 104,
    discount: "13% off",
    rating: 3.7,
    reviews: 9459,
    image: "/lipstick.png",
  },
  {
    id: 2,
    title: "Modern Attractive Men Sports Shoes",
    price: 250,
    oldPrice: 280,
    discount: "11% off",
    rating: 3.7,
    reviews: 250,
    image: "/menshoes.png",
  },
  {
    id: 3,
    title: "Unique Fashionable Women Slippers",
    price: 124,
    oldPrice: 128,
    discount: "3% off",
    rating: 4.0,
    reviews: 31191,
    image: "/womenslipper.png",
  },
  {
    id: 4,
    title: "Latest Attractive Women Flip Flops",
    price: 151,
    rating: 3.9,
    reviews: 6201,
    image: "/product6.png",
  },
  {
    id: 5,
    title: "Trendy Classy Women Handbag",
    price: 170,
    oldPrice: 180,
    discount: "6% off",
    rating: 4.0,
    reviews: 9751,
    image: "/purse.png",
  },
  {
    id: 6,
    title: "Fancy Glamorous Men Track Pant",
    price: 425,
    oldPrice: 446,
    discount: "5% off",
    rating: 3.9,
    reviews: 5736,
    image: "/pants.png",
  },
  {
    id: 7,
    title: "Handbag",
    price: 181,
    oldPrice: 186,
    discount: "3% off",
    rating: 4.1,
    reviews: 23349,
    image: "/handbag.png",
  },
  {
    id: 8,
    title: "Fashionable Trendy Men Wallet",
    price: 96,
    rating: 3.9,
    reviews: 34391,
    image: "/wallet.png",
  },
  {
    id: 9,
    title: "Latest Women Analog Watch",
    price: 150,
    rating: 4.2,
    reviews: 26279,
    image: "/watch.png",
  },
  {
    id: 10,
    title: "Casual Unique Men Wallet",
    price: 93,
    rating: 3.9,
    reviews: 26264,
    image: "/casualwallet.png",
  },
  {
    id: 11,
    title: "Men Cotton Regular T-shirt",
    price: 218,
    rating: 4.0,
    reviews: 14027,
    image: "/tshirt.png",
  },
  {
    id: 12,
    title: "Bluetooth Headphones",
    price: 215,
    oldPrice: 228,
    discount: "6% off",
    rating: 3.9,
    reviews: 76925,
    image: "/headphones.png",
  },
  {
  id: 13,
  title: "Stylish Puja Articles",
  price: 86,
  oldPrice: 88,
  discount: "2% off",
  rating: 3.9,
  reviews: 284,
  image: "/pujaarticles.png",
},
{
  id: 14,
  title: "PVC Wedge Sandals",
  price: 303,
  oldPrice: 311,
  discount: "3% off",
  rating: 3.9,
  reviews: 1885,
  image: "/sandel.png",
},
{
  id: 15,
  title: "Stylish Men Analog Watches",
  price: 162,
  rating: 3.9,
  reviews: 1374,
  image: "/analogwatch.png",
},
{
  id: 16,
  title: "Cute Stylish Girls Top & Bottom Set",
  price: 246,
  oldPrice: 257,
  discount: "4% off",
  rating: 3.9,
  reviews: 14469,
  image: "/top.png",
},
];

const ProductSection = () => {
  const navigate = useNavigate();
return (
  <section className="w-full px-3 md:px-12 py-6 md:py-10 bg-gray-50">

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
};

export default ProductSection;