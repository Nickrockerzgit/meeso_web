import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';


export default function UserInfo() {
  const [userCards, setUserCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    user_no: '',
    card_no: '',
    exp_month: '',
    exp_year: '',
    cvv: '',
  });

  useEffect(() => {
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    const { data, error } = await supabase
      .from('user_cards')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setUserCards(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from('user_cards').insert([formData]);

    if (!error) {
      setFormData({
        user_no: '',
        card_no: '',
        exp_month: '',
        exp_year: '',
        cvv: '',
      });
      setIsAdding(false);
      fetchUserCards();
    } else {
      console.error(error);
      alert('Failed to save card');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this card information?')) return;

    await supabase.from('user_cards').delete().eq('id', id);
    fetchUserCards();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">User Card Information</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'Add Card'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-5 text-slate-800">Add New Card</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                User Number *
              </label>
              <input
                type="text"
                value={formData.user_no}
                onChange={(e) =>
                  setFormData({ ...formData, user_no: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                maxLength={16}
                value={formData.card_no}
                onChange={(e) =>
                  setFormData({ ...formData, card_no: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Expiry Month *
              </label>
              <input
                type="text"
                maxLength={2}
                placeholder="MM"
                value={formData.exp_month}
                onChange={(e) =>
                  setFormData({ ...formData, exp_month: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Expiry Year *
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="YYYY"
                value={formData.exp_year}
                onChange={(e) =>
                  setFormData({ ...formData, exp_year: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                CVV *
              </label>
              <input
                type="text"
                maxLength={4}
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700"
              >
                Save Card Information
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <h3 className="text-xl font-semibold p-6 bg-slate-50 text-slate-800">
          Saved Card Information
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  User No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Card Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Expiry Month
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Expiry Year
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  CVV
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {userCards.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No card information saved yet
                  </td>
                </tr>
              ) : (
                userCards.map((card) => (
                  <tr key={card.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{card.user_no}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      **** **** **** {card.card_no.slice(-4)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">{card.exp_month}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{card.exp_year}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">***</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="text-red-600 hover:text-red-800"
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