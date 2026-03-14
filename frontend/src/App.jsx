import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/user/landingPage.jsx';
import ProductDetails from "./pages/user/ProductDetails.jsx";
import RegisterNumber from "./pages/user/RegisterNumber.jsx";
import CheckoutPage from "./pages/user/userAddress.jsx";
import PaymentPage from  "./pages/user/paymentPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow">

          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/phone/:id" element={<RegisterNumber />} />
            <Route path="/address/:id" element={<CheckoutPage />} />
            <Route path="/paymentPage" element={<PaymentPage />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-96">
                  <h1 className="text-3xl font-bold text-gray-700">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;