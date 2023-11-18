import { Outlet } from "react-router-dom";
import { SellerProfileSections } from "./sellerProfileSections/SellerProfileSections";
import { SellerProfileTaps } from "./sellerProfileTaps/SellerProfileTaps";

export const SellerProfile = () => {
  return (
    <div className="container my-5">
      <div className="d-block d-md-flex gap-4">
        <SellerProfileSections />
        <div className="d-flex flex-column gap-4 flex-grow-1">
          <SellerProfileTaps />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
