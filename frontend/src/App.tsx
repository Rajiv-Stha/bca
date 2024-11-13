import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import Buy from "./pages/buy/Buy";
import Signup from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import Upload from "./pages/upload/Upload";
import { useContext } from "react";
import { ThriftContext } from "./context/Context";

import { getSessionUser } from "./utils/api";
import { useEffect } from "react";
import Transaction from "./pages/transaction/Transaction";
import AllProducts from "./pages/AllProducts/allProducts";
import Confirmation from "./pages/confirmation/Confirmation";
import Confirmation_email_send from "./pages/confirmation_email_send/Confirmation_email_send";
import Verify from "./pages/verify/Verify";
import Profile from "./pages/profile/Profile";
import CheckoutPage from "./pages/checkout/Checkout";
import AboutPage from "./pages/about/Aboutpage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyProducts from "./pages/myProducts/MyProducts";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import PaymentFailure from "./pages/paymentFailure/PaymentFailure";

function App() {
  const { state, dispatch } = useContext(ThriftContext);

  useEffect(() => {
    fetchSessionUser();
  }, []);
  const fetchSessionUser = async () => {
    try {
      const { data, status } = await getSessionUser();
      if (status === 200) {
        dispatch({ type: "addUser", payload: data.message });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="app_container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<Buy />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route
            path="/account/email-confirmation"
            element={<Confirmation />}
          />
          <Route
            path="/account/confirmation_email_sent"
            element={<Confirmation_email_send />}
          />
          <Route path="/account/verify_email" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/myproducts/:user_id" element={<MyProducts/>} />
          <Route path="/success" element={<PaymentSuccess/>}/>
          <Route path="/failure" element={<PaymentFailure/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
