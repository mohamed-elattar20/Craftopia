// Routing
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// Contexts
import { UserContext } from "./Contexts/UserContext";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
//  Components & Pages
import Navbar from "./components/Navbar/Navbar";
import { SellerProfileProducts } from "./pages/sellerProfile/sellerProfileProducts/SellerProfileProducts";
import { SellerProfile } from "./pages/sellerProfile/SellerProfile";
import { SellerProfileAccount } from "./pages/sellerProfile/sellerProfileAccount/SellerProfileAccount";
import { UserProfileAccount } from "./pages/userProfile/userProfileAccount/UserProfileAccount";
import { UserProfileAddress } from "./pages/userProfile/userProfileAddress/UserProfileAddress";
import { UserProfileOrders } from "./pages/userProfile/userProfileOrders/UserProfileOrders";

import StorePage from "./pages/StorePage/StorePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import ProductDetailsDesc from "./pages/ProductDetailsPage/ProductDetailsDesc";
import ProductDetailsReviews from "./pages/ProductDetailsPage/ProductDetailsReviews";
import HomePage from "./pages/HomePage/HomePage";
import { Footer } from "./components/Footer/Footer";
import ContactUs from "./pages/ContactUsPage/ContactUs/ContactUs";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/RegisterSeller/RegisterSeller";
import UserRuleChoice from "./components/UserRuleChoice/UserRuleChoice";
import RegisterSeller from "./pages/RegisterPage/RegisterSeller/RegisterSeller";
import RegisterBuyer from "./pages/RegisterPage/RegisterBuyer/RegisterBuyer";
import ProtectedRoutesLogin from "./pages/ProtectedRoutes/ProtectedRoutesLogin";
import ProtectedRoutesProfile from "./pages/ProtectedRoutes/ProtectedRoutesProfile";
import ResetPassword from "./pages/LoginPage/ResetPassword/ResetPassword";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProtectedRoutesProfileSeller from "./pages/ProtectedRoutes/ProtectedRoutesProfileSeller";
import ProtectedRoutesProfilebuyer from "./pages/ProtectedRoutes/ProtectedRoutesProfilebuyer";
import { UserContextProvider } from "./Contexts/UserContext";
import { UserProfile } from "./pages/userProfile/UserProfile";
import Cart from "./components/Cart/Cart";
import Forum from "./components/community/Forum";
import { UserProfilePosts } from "./pages/userProfile/userProfilePosts/UserProfilePosts";
import UserProfileWishList from "./pages/userProfile/userProfileWishList/UserProfileWishList";
import SellerProfilePosts from "./pages/sellerProfile/sellerProfilePosts/SellerProfilePosts";
import SellerProductsPage from "./pages/SellerProductsPage/SellerProductsPage";
import { ProtectedRoutesNotSeller } from "./pages/ProtectedRoutes/ProtectedRoutesNotSeller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ProductType } from "./Types/ProductType";
import { doc, updateDoc } from "firebase/firestore";
import { MainLayout } from "./pages/MainLayout/MainLayout";

function App() {
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51OCi4LJasLK18SRGg5xOYbWi3Va4ZWDMeOJHFKLW1uKefFe4ISHXbDrgDLeZJHomGUmMawXy1VIfovrpccyMLPEX00nGQbXtZ2";

  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <button onClick={scrollUp} className="btn btn-primary fixedBtn ">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      {/* <Navbar /> */}
      <Routes>
        {/* Protected Routes login ********************/}
        <Route element={<ProtectedRoutesLogin />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<UserRuleChoice />} />
          <Route path="/register/seller" element={<RegisterSeller />} />
          <Route path="/register/buyer" element={<RegisterBuyer />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="/contact-us" element={<ContactUs />} />
          <Route element={<ProtectedRoutesNotSeller />}>
            <Route path="" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/search/:word" element={<SearchPage />} />
            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/products/:sellerId"
              element={<SellerProductsPage />}
            />
          </Route>
          {/* Protected Routes Profile ********************/}
          <Route element={<ProtectedRoutesProfile />}>
            <Route path="/community" element={<Forum />} />
            {/*ProtectedRoutesProfile  */}
            <Route path="/" element={<ProtectedRoutesProfilebuyer />}>
              <Route path={`/user/profile`} element={<UserProfile />}>
                <Route path="" element={<UserProfileAccount />} />
                <Route path="address" element={<UserProfileAddress />} />
                <Route path="orders" element={<UserProfileOrders />} />
                <Route path="posts" element={<UserProfilePosts />} />
                <Route path="wishlist" element={<UserProfileWishList />} />
              </Route>
            </Route>
            {/*ProtectedRoutesProfileSeller  */}
            <Route element={<ProtectedRoutesProfileSeller />}>
              <Route path="/seller/profile" element={<SellerProfile />}>
                <Route path="" element={<SellerProfileAccount />} />
                <Route path="products" element={<SellerProfileProducts />} />
                <Route path="posts" element={<SellerProfilePosts />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
