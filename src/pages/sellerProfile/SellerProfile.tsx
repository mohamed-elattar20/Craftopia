import { Outlet } from "react-router-dom";
import { SellerProfileSections } from "./SellerProfileSections/SellerProfileSections";

export const SellerProfile = () => {
  return (
    <div className="container my-5">
      <div className="d-flex gap-4">
        <SellerProfileSections />
        <Outlet />
      </div>
    </div>
  );
};
