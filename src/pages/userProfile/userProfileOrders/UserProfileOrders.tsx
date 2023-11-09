import item from "../../../assets/images/User Profile/product.jpeg";
import { UserProfileOrder } from "../../../components/UserProfileOrder/UserProfileOrder";
import { UserProfileTaps } from "../UserProfileTaps/UserProfileTaps";
export const UserProfileOrders = () => {
  return (
    <div className="user-profile border py-5 px-2 px-sm-5 rounded-4 flex-grow-1">
      <UserProfileTaps />
      <h2 className="text-center my-4">الطلبات</h2>

      <UserProfileOrder />
    </div>
  );
};
