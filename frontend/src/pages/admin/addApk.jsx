import { useState, useEffect } from 'react';
import { Save, CreditCard as Edit2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL ||"http://localhost:5000";
console.log(API);

export default function AddApk() {
  const [apkUrl, setApkUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchApkUrl();
  }, []);

  const fetchApkUrl = async () => {
    try {
      const res = await fetch(`${API}/api/settings/apk_url`);
      if (!res.ok) return;

      const data = await res.json();
      setApkUrl(data?.setting_value || '');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const res = await fetch(`${API}/api/settings/apk_url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: apkUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      alert("APK URL saved successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save URL");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">APK Management</h2>

      <div className="bg-white rounded-xl shadow border border-slate-200 p-6 max-w-3xl">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          APK Download URL
        </label>

        <input
          type="url"
          value={apkUrl}
          onChange={(e) => setApkUrl(e.target.value)}
          disabled={!isEditing}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !isEditing ? "bg-slate-50 text-slate-600" : ""
          }`}
          placeholder="https://example.com/app.apk"
        />

        <div className="mt-6 flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 size={18} />
              Change URL
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Save URL"}
              </button>

              <button
                onClick={() => {
                  setIsEditing(false);
                  fetchApkUrl();
                }}
                className="px-6 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {apkUrl && !isEditing && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-slate-700">
              <strong>Current APK URL:</strong>
            </p>

            <a
              href={apkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all text-sm mt-1 block"
            >
              {apkUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}