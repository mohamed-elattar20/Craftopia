import React, { useContext } from "react";
import { ProductsTable } from "./ProductsTable";
import { CartPrices } from "./CartPrices";
import { DocumentData } from "firebase/firestore";
import { UserContext } from "../../Contexts/UserContext";
import { AnonymousUserContext } from "../../Contexts/AnonymousUserContext";

interface CartPurchasesProps {
  nextPage: (value: number) => void;
}

export const CartPurchases = ({ nextPage }: CartPurchasesProps) => {
  const { currentUser } = useContext(UserContext);
  const { anonymousCartItems } = useContext(AnonymousUserContext);

  return (
    <div className="container">
      {(currentUser && Object.values(currentUser?.cart).length > 0) ||
      (anonymousCartItems && Object.values(anonymousCartItems).length > 0) ? (
        <div>
          <div className="row mt-5">
            <div className="col-12  col-lg-9 ">
              <div>
                <ProductsTable />
              </div>
            </div>

            <div className="col-12  col-lg-3 ">
              <CartPrices nextPage={nextPage} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5 text-center">
          <h4>عربة التسوق فارغة</h4>
          <div className="mt-3">
            <button className="btn btn-secondary text-white">
              ابدأ التسوق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
