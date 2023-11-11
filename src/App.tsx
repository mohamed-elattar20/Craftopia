// Routing
import { Navigate, Route, Routes } from "react-router-dom";
// Contexts
import { UserContext } from "./Contexts/UserContext";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
//  Components & Pages
import Navbar from "./components/Navbar/Navbar";
import { SellerProfileProducts } from "./pages/sellerProfile/SellerProfileProducts";
import { SellerProfile } from "./pages/sellerProfile/SellerProfile";
import { SellerProfileAccount } from "./pages/sellerProfile/SellerProfileAccount";
import { UserProfileAccount } from "./pages/userProfile/userProfileAccount/UserProfileAccount";
import { UserProfileAddress } from "./pages/userProfile/userProfileAddress/UserProfileAddress";
import { UserProfileOrders } from "./pages/userProfile/userProfileOrders/UserProfileOrders";
import StorePage from "./pages/StorePage/StorePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import ProductDetailsDesc from "./pages/ProductDetailsPage/ProductDetailsDesc";
import ProductDetailsReviews from "./pages/ProductDetailsPage/ProductDetailsReviews";
import HomePage from "./pages/HomePage/HomePage";
import { Footer } from "./components/Footer";
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

function App() {
  const { myUser, authUser } = useContext(UserContext);
  // console.log(`user`, myUser);
  // console.log(`userrrrrrrrrr`, authUser);

  const [user] = useAuthState(auth);
  const [us, setUs] = useState<User | null | undefined>();
  console.log(user);

  useEffect(() => {
    setUs(user);
  }, [user]);
  return (
    <div className="App">
      {/* <UserContextProvider> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/search/:word" element={<SearchPage />} />
        {/* Protected Routes login ********************/}
        <Route element={<ProtectedRoutesLogin />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<UserRuleChoice />} />
          <Route path="/register/seller" element={<RegisterSeller />} />
          <Route path="/register/buyer" element={<RegisterBuyer />} />
        </Route>
        {/* Protected Routes login ********************/}
        {/* Protected Routes Profile ********************/}
        <Route element={<ProtectedRoutesProfile />}>
          {/* *************************************************************************** */}
          {/* <Route element={<ProtectedRoutesProfilebuyer />}> */}
          <Route path={`/user/profile`} element={<UserProfile />}>
            <Route path="" element={<UserProfileAccount />} />
            <Route path="address" element={<UserProfileAddress />} />
            <Route path="orders" element={<UserProfileOrders />} />
          </Route>

          {/* </Route> */}
          {/* *************************************************************************** */}
          {/* <Route element={<ProtectedRoutesProfileSeller />}> */}

          <Route path="/seller/profile" element={<SellerProfile />}>
            <Route path="" element={<SellerProfileAccount />} />
            <Route path="products" element={<SellerProfileProducts />} />
          </Route>
          {/* </Route> */}
          {/* *************************************************************************** */}
        </Route>
        {/* Protected Routes Profile ********************/}
        <Route path="/product-details/:id" element={<ProductDetailsPage />}>
          <Route path="" element={<ProductDetailsDesc />} />
          <Route path="description" element={<ProductDetailsDesc />} />
          <Route path="reviews" element={<ProductDetailsReviews />} />
        </Route>
      </Routes>
      <Footer />
      {/* </UserContextProvider> */}
    </div>
  );
}

export default App;
