import { UserProfileSections } from "./UserProfileSections/UserProfileSections";
import { Outlet } from "react-router-dom";

export const UserProfile = () => {
  return (
    <div className="container my-5">
      <div className="d-flex gap-4">
        <UserProfileSections />
        {/* <Outlet /> */}
      </div>
    </div>
  );
};
