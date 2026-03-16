import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Upload } from "lucide-react";

const API = import.meta.env.VITE_API_URL ||"http://localhost:5000";

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Track selected image previews for display
  const [imagePreviews, setImagePreviews] = useState({ 1: null, 2: null, 3: null, 4: null });

  const [formData, setFormData] = useState({
    product_detail: "",
    price: "",
    old_price: "",
    rating: "",
    total_ratings: "",
    total_reviews: "",
    shop_name: "",
    shop_followers: "",
    shop_total_products: "",
    shop_rating: "",
    shop_total_ratings: "",
    image_1: null,
    image_2: null,
    image_3: null,
    image_4: null,
    highlights: [{ key: "", value: "" }],
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      product_detail: "",
      price: "",
      old_price: "",
      rating: "",
      total_ratings: "",
      total_reviews: "",
      shop_name: "",
      shop_followers: "",
      shop_total_products: "",
      shop_rating: "",
      shop_total_ratings: "",
      image_1: null,
      image_2: null,
      image_3: null,
      image_4: null,
      highlights: [{ key: "", value: "" }],
    });
    setImagePreviews({ 1: null, 2: null, 3: null, 4: null });
    setReviews([]);
    setEditingProduct(null);
    setIsAdding(false);
    setError(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      product_detail: product.product_detail || "",
      price: product.price || "",
      old_price: product.old_price || "",
      rating: product.rating || "",
      total_ratings: product.total_ratings || "",
      total_reviews: product.total_reviews || "",
      shop_name: product.shop_name || "",
      shop_followers: product.shop_followers || "",
      shop_total_products: product.shop_total_products || "",
      shop_rating: product.shop_rating || "",
      shop_total_ratings: product.shop_total_ratings || "",
      image_1: null,
      image_2: null,
      image_3: null,
      image_4: null,
      highlights: product.highlights
        ? Object.entries(product.highlights).map(([k, v]) => ({ key: k, value: v }))
        : [{ key: "", value: "" }],
    });
    setImagePreviews({ 1: null, 2: null, 3: null, 4: null });
    setReviews([]);
    setError(null);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, { key: "", value: "" }] });
  };

  const removeHighlight = (index) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const updateHighlight = (index, field, value) => {
    const arr = [...formData.highlights];
    arr[index][field] = value;
    setFormData({ ...formData, highlights: arr });
  };

  const addReview = () => {
    setReviews([
      ...reviews,
      { rating: "", comment: "", reviewerName: "", reviewImage: null, preview: "" },
    ]);
  };

  const removeReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const updateReview = (index, field, value) => {
    const arr = [...reviews];
    arr[index][field] = value;
    setReviews(arr);
  };

  const handleReviewImageChange = (index, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    const arr = [...reviews];
    arr[index].reviewImage = file;
    arr[index].preview = preview;
    setReviews(arr);
  };

  // FIX: Dedicated handler — stores file + generates preview
  const handleImageChange = (num, file) => {
    if (!file) return;
    setFormData((prev) => ({ ...prev, [`image_${num}`]: file }));
    setImagePreviews((prev) => ({ ...prev, [num]: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const highlightsObj = formData.highlights.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {});

      const form = new FormData();

      // Exclude image_* and highlights from generic loop — handled separately below
      Object.entries(formData).forEach(([key, value]) => {
        if (!key.startsWith("image_") && key !== "highlights") {
          // FIX: Skip null/undefined to avoid sending the string "null" to the server
          if (value !== null && value !== undefined) {
            form.append(key, value);
          }
        }
      });

      form.append("highlights", JSON.stringify(highlightsObj));

      if (formData.image_1) form.append("images", formData.image_1);
      if (formData.image_2) form.append("images", formData.image_2);
      if (formData.image_3) form.append("images", formData.image_3);
      if (formData.image_4) form.append("images", formData.image_4);

      let productId;

      if (!editingProduct) {
        const res = await fetch(`${API}/api/products`, { method: "POST", body: form });
        if (!res.ok) throw new Error("Failed to create product");
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        productId = data.id;
      } else {
        // FIX: Check PUT response for errors too
        const res = await fetch(`${API}/api/products/${editingProduct.id}`, {
          method: "PUT",
          body: form,
        });
        if (!res.ok) throw new Error("Failed to update product");
        productId = editingProduct.id;
      }

      for (const review of reviews) {
        const reviewForm = new FormData();
        reviewForm.append("rating", review.rating);
        reviewForm.append("comment", review.comment);
        reviewForm.append("reviewerName", review.reviewerName);
        if (review.reviewImage) {
          reviewForm.append("reviewImage", review.reviewImage);
        }
        await fetch(`${API}/api/products/${productId}/reviews`, {
          method: "POST",
          body: reviewForm,
        });
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      // FIX: Use finally so loading always clears even when an error is thrown
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Product Management</h2>
        <button
          onClick={() => {
            if (isAdding) {
              resetForm();
            } else {
              setIsAdding(true);
            }
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? "Cancel" : "Add Product"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 ml-4">
            <X size={16} />
          </button>
        </div>
      )}

      {isAdding && (
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-slate-800">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── Product Details ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Detail *
                </label>
                <textarea
                  value={formData.product_detail}
                  onChange={(e) => setFormData({ ...formData, product_detail: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Old Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.old_price}
                  onChange={(e) => setFormData({ ...formData, old_price: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Total Ratings
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.total_ratings}
                  onChange={(e) => setFormData({ ...formData, total_ratings: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Total Reviews
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.total_reviews}
                  onChange={(e) => setFormData({ ...formData, total_reviews: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* ── Highlights ── */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">Highlights</label>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <Plus size={16} /> Add Highlight
                </button>
              </div>
              {formData.highlights.map((h, index) => (
                <div key={index} className="flex gap-3 mb-3 items-center">
                  <input
                    type="text"
                    placeholder="Key (e.g. Material)"
                    value={h.key}
                    onChange={(e) => updateHighlight(index, "key", e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={h.value}
                    onChange={(e) => updateHighlight(index, "value", e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* ── Product Images ── */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Images
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex flex-col items-center gap-2">
                    {imagePreviews[num] ? (
                      <div className="relative w-full">
                        <img
                          src={imagePreviews[num]}
                          alt={`Image ${num}`}
                          className="w-full h-24 object-cover rounded-lg border border-slate-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, [`image_${num}`]: null }));
                            setImagePreviews((prev) => ({ ...prev, [num]: null }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer w-full bg-blue-50 border-2 border-dashed border-blue-300 text-blue-700 px-3 py-4 rounded-lg hover:bg-blue-100 flex flex-col items-center gap-1 text-center">
                        <Upload size={18} />
                        <span className="text-xs font-medium">Image {num}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(num, e.target.files[0])}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Shop Details ── */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Shop Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    value={formData.shop_name}
                    onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Shop Followers *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.shop_followers}
                    onChange={(e) => setFormData({ ...formData, shop_followers: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Shop Rating *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.shop_rating}
                    onChange={(e) => setFormData({ ...formData, shop_rating: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Shop Total Products *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.shop_total_products}
                    onChange={(e) =>
                      setFormData({ ...formData, shop_total_products: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Shop Total Ratings *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.shop_total_ratings}
                    onChange={(e) =>
                      setFormData({ ...formData, shop_total_ratings: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ── Reviews ── */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-slate-700">Reviews</label>
                <button
                  type="button"
                  onClick={addReview}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <Plus size={16} /> Add Review
                </button>
              </div>

              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-4 mb-4 bg-slate-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-slate-700">Review {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeReview(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Rating (1-5) *</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={review.rating}
                        onChange={(e) => updateReview(index, "rating", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Reviewer Name</label>
                      <input
                        type="text"
                        value={review.reviewerName}
                        onChange={(e) => updateReview(index, "reviewerName", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm text-slate-600 mb-1">Comment</label>
                    <textarea
                      value={review.comment}
                      onChange={(e) => updateReview(index, "comment", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      rows={3}
                    />
                  </div>

                  <div className="mt-3">
                    <label className="block text-sm text-slate-600 mb-1">
                      Review Image (optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center gap-2">
                        <Upload size={16} />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleReviewImageChange(index, e.target.files[0])}
                        />
                      </label>
                      {review.preview && (
                        <div className="relative">
                          <img
                            src={review.preview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              updateReview(index, "reviewImage", null);
                              updateReview(index, "preview", "");
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {reviews.length === 0 && (
                <p className="text-slate-500 text-sm italic">No reviews added yet</p>
              )}
            </div>

            {/* ── Submit ── */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition font-medium"
              >
                <Save size={20} />
                {loading ? "Saving..." : editingProduct ? "Update Product" : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Products Table ── */}
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <h3 className="text-xl font-semibold p-6 bg-slate-50 text-slate-800">Products List</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Reviews
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No products added yet
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">
                        {product.product_detail?.substring(0, 70) || "—"}
                        {product.product_detail?.length > 70 ? "..." : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        ₹{Number(product.price)?.toFixed(2) || "0.00"}
                      </div>
                      {product.old_price > 0 && (
                        <div className="text-xs text-slate-500 line-through">
                          ₹{Number(product.old_price).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        {product.rating || "—"} ({product.total_ratings || 0})
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {product.total_reviews || 0}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}