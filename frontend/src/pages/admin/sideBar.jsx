import { Package, Smartphone, CreditCard, X } from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection, isOpen, toggleSidebar }) {
  const menuItems = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'apk', label: 'APK Management', icon: Smartphone },
    { id: 'users', label: 'User Cards', icon: CreditCard },
    { id: 'banners', label: 'Add Banner', icon: CreditCard },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}