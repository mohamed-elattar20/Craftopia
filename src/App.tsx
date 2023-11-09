import AboutUs from "./components/AboutUs";
import Cart from "./components/Cart/Cart";
import Explore from "./components/Explore/Explore";
import Invest from "./components/Invest/Invest";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import { HeroSection } from "./components/HeroSection/HeroSection";
import Categories from "./pages/HomePage/Categories/Categories";
import LatestOffers from "./pages/HomePage/LatestOffers/LatestOffers";

import { UserProile } from "./pages/userProfile/UserProile";
import { Route, Routes } from "react-router-dom";
import { UserProfileAccount } from "./pages/userProfile/userProfileAccount/UserProfileAccount";
import { UserProfileAddress } from "./pages/userProfile/userProfileAddress/UserProfileAddress";
import { UserProfileOrders } from "./pages/userProfile/userProfileOrders/UserProfileOrders";
import { UserProfilePosts } from "./pages/userProfile/userProfilePosts/UserProfilePosts";
import { UserProfileSavedPosts } from "./pages/userProfile/userProfileSavedPosts/UserProfileSavedPosts";
import StorePage from "./pages/StorePage/StorePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import ProductDetailsDesc from "./pages/ProductDetailsPage/ProductDetailsDesc";
import ProductDetailsReviews from "./pages/ProductDetailsPage/ProductDetailsReviews";
import HomePage from "./pages/HomePage/HomePage";
import { Footer } from "./components/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register/Register";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {/*  */}
        <Route path="/user/profile" element={<UserProile />}>
          <Route path="" element={<UserProfileAccount />} />
          <Route path="address" element={<UserProfileAddress />} />
          <Route path="orders" element={<UserProfileOrders />} />
        </Route>
        <Route path="/product-details/:id" element={<ProductDetailsPage />}>
          <Route path="" element={<ProductDetailsDesc />} />
          <Route path="description" element={<ProductDetailsDesc />} />
          <Route path="reviews" element={<ProductDetailsReviews />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
