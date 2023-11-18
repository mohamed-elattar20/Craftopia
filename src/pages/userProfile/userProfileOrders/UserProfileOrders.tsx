import { UserProfileOrder } from "../../../components/UserProfileOrder/UserProfileOrder";
import { UserProfileTaps } from "../userProfileTaps/UserProfileTaps";

export const UserProfileOrders = () => {
  return (
    <div className="user-profile border py-5 px-2 px-sm-5 rounded-4 flex-grow-1">
      <h2 className="text-center my-4">الطلبات</h2>
      <UserProfileOrder />
    </div>
  );
};
