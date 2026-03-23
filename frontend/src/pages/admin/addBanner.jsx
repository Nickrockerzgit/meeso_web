import { useEffect, useState } from "react";
import { Save, Edit2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AddBanner() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBanner();
  }, []);

  // ✅ Fetch existing banner
  const fetchBanner = async () => {
    try {
      const res = await fetch(`${API}/api/banner`);
      if (!res.ok) return;

      const data = await res.json();

      if (data) {
        setPreview1(data.image_url_1 || "");
        setPreview2(data.image_url_2 || "");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Handle image select + preview
  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Save banner
  const handleSave = async () => {
    setIsSaving(true);

    try {
      const formData = new FormData();
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);

      const res = await fetch(`${API}/api/banner`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      alert("Banner saved successfully!");
      setIsEditing(false);
      setImage1(null);
      setImage2(null);

      fetchBanner(); // refresh UI
    } catch (err) {
      console.error(err);
      alert("Failed to save banner");
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setImage1(null);
    setImage2(null);
    fetchBanner();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Banner Management</h2>

      <div className="bg-white p-6 rounded-xl shadow max-w-3xl">

        {/* IMAGE 1 */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Banner Image 1</label>

          <input
            type="file"
            accept="image/*"
            disabled={!isEditing}
            onChange={(e) =>
              handleImageChange(e, setImage1, setPreview1)
            }
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* IMAGE 2 */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Banner Image 2</label>

          <input
            type="file"
            accept="image/*"
            disabled={!isEditing}
            onChange={(e) =>
              handleImageChange(e, setImage2, setPreview2)
            }
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Edit2 size={18} />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={handleCancel}
                className="border px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* PREVIEW */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {preview1 && (
            <img
              src={preview1}
              alt="banner1"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}
          {preview2 && (
            <img
              src={preview2}
              alt="banner2"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}