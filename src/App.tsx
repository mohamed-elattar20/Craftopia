import Navbar from "./components/Navbar/Navbar";
import { UserProile } from "./pages/userProfile/UserProfile";
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
import ContactUs from "./pages/ContactUsPage/ContactUs/ContactUs";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register/Register";
import { UserContextProvider } from "./Contexts/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

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
          <Route path="/user/profile" element={<UserProile />}>
            <Route path="" element={<UserProfileAccount />} />
            <Route path="address" element={<UserProfileAddress />} />
            <Route path="orders" element={<UserProfileOrders />} />
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
