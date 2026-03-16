import { useState } from 'react';
import Sidebar from './sideBar.jsx';
import AddProduct from './addProduct.jsx';
import AddApk from './addApk.jsx';
import UserInfo from './userInfo.jsx';
import { Menu } from 'lucide-react';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header with menu button */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <button onClick={toggleSidebar} className="text-slate-700">
              <Menu size={28} />
            </button>
            <span className="font-semibold text-slate-800">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {activeSection === 'products' && <AddProduct />}
          {activeSection === 'apk' && <AddApk />}
          {activeSection === 'users' && <UserInfo />}
        </main>
      </div>
    </div>
  );
}