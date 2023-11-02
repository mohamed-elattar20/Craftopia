import React from "react";
import { UserProfileSections } from "./userProfileSections/UserProfileSections";
import { UserProfileAccount } from "./userProfileAccount/UserProfileAccount";
import { Outlet } from "react-router-dom";

export const UserProile = () => {
  return (
    <div className="container my-5">
      <div className="d-flex gap-4">
        <UserProfileSections />
        <Outlet />
      </div>
    </div>
  );
};
