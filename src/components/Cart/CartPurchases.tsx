import React from "react";
import { ProductsTable } from "./ProductsTable";
import { CartPrices } from "./CartPrices";
import { DocumentData } from "firebase/firestore";

interface CartPurchasesProps {
  nextPage: (value: number) => void;
}

export const CartPurchases = ({ nextPage }: CartPurchasesProps) => {
  return (
    <div className="container">
      <div className="row align-items-center">
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
  );
};
