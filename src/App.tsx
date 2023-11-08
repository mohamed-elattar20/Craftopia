import Navbar from "./components/Navbar/Navbar";
import { UserProile } from "./pages/userProfile/UserProile";
import { Route, Routes } from "react-router-dom";
import { UserProfileAccount } from "./pages/userProfile/userProfileAccount/UserProfileAccount";
import { UserProfileAddress } from "./pages/userProfile/userProfileAddress/UserProfileAddress";
import { UserProfileOrders } from "./pages/userProfile/userProfileOrders/UserProfileOrders";
import StorePage from "./pages/StorePage/StorePage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import ProductDetailsDesc from "./pages/ProductDetailsPage/ProductDetailsDesc";
import ProductDetailsReviews from "./pages/ProductDetailsPage/ProductDetailsReviews";

function App() {
  return (
    <div className="App">
      {/* <Routes>
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
      </Routes> */}
    </div>
  );
}

export default App;
