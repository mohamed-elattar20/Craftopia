import { Outlet } from "react-router-dom";
import { UserProfileSections } from "./userProfileSections/UserProfileSections";
import { UserProfileTaps } from "./userProfileTaps/UserProfileTaps";

export const UserProfile = () => {
  return (
    <div className="container my-5">
      <div className="d-block d-md-flex gap-4">
        <UserProfileSections />
        <div className="d-flex flex-column gap-4 flex-grow-1">
          <UserProfileTaps />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
