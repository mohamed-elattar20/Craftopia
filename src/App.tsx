// import AboutUs from "./components/AboutUs";
import Cart from "./components/Cart/Cart";
import Explore from "./components/Explore/Explore";
import Invest from "./components/Invest/Invest";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { UserProfileAccount } from "./pages/userProfile/userProfileAccount/UserProfileAccount";
import { UserProfileAddress } from "./pages/userProfile/userProfileAddress/UserProfileAddress";
import { UserProfileOrders } from "./pages/userProfile/userProfileOrders/UserProfileOrders";

import StorePage from "./pages/StorePage/StorePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import ProductDetailsDesc from "./pages/ProductDetailsPage/ProductDetailsDesc";
import ProductDetailsReviews from "./pages/ProductDetailsPage/ProductDetailsReviews";
import { SellerProfileProducts } from "./pages/sellerProfile/sellerProfileProducts/SellerProfileProducts";
import { SellerProfile } from "./pages/sellerProfile/SellerProfile";
import { SellerProfileAccount } from "./pages/sellerProfile/sellerProfileAccount/SellerProfileAccount";
import HomePage from "./pages/HomePage/HomePage";
import { Footer } from "./components/Footer";
import ContactUs from "./pages/ContactUsPage/ContactUs/ContactUs";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register/Register";
import { UserContextProvider } from "./Contexts/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { UserProfile } from "./pages/userProfile/UserProfile";

function App() {
  const [user] = useAuthState(auth);
  const [us, setUs] = useState<User | null | undefined>();
  useEffect(() => {
    setUs(user);
    console.log(us);
  }, [user]);
  return (
    <div className="App">
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* ******************************* */}
          {/* <Route path="*" element={<HomePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          {!us ? (
            <Route path="/login" element={<LoginPage />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
          {/* ************************ */}
          <Route path="/register" element={<Register />} />
          {/* Comment */}
          <Route path="/user/profile" element={<UserProfile />}>
            <Route path="" element={<UserProfileAccount />} />
            <Route path="address" element={<UserProfileAddress />} />
            <Route path="orders" element={<UserProfileOrders />} />
          </Route>
          <Route path="/seller/profile" element={<SellerProfile />}>
            <Route path="" element={<SellerProfileAccount />} />
            <Route path="products" element={<SellerProfileProducts />} />
          </Route>
          {/* Comment */}
          <Route path="/product-details/:id" element={<ProductDetailsPage />}>
            <Route path="" element={<ProductDetailsDesc />} />
            <Route path="description" element={<ProductDetailsDesc />} />
            <Route path="reviews" element={<ProductDetailsReviews />} />
          </Route>
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;
