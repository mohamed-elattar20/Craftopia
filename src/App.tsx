import Navbar from "./components/Navbar/Navbar";
import { UserProile } from "./pages/userProfile/UserProile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProfileAccount } from "./pages/userProfile/userProfileAccount/UserProfileAccount";
import { UserProfileAddress } from "./pages/userProfile/userProfileAddress/UserProfileAddress";
import { UserProfileOrders } from "./pages/userProfile/userProfileOrders/UserProfileOrders";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/user/profile" element={<UserProile />}>
            <Route path="" element={<UserProfileAccount />} />
            <Route path="address" element={<UserProfileAddress />} />
            <Route path="orders" element={<UserProfileOrders />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
