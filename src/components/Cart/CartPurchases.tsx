import React from "react";
import { ProductsTable } from "./ProductsTable";
import { CartPrices } from "./CartPrices";

interface CartPurchasesProps {
  nextPage: (value: number) => void;
}

export const CartPurchases = ({ nextPage }: CartPurchasesProps) => {
  return (
    <>
      <ProductsTable />
      <CartPrices nextPage={nextPage} />
    </>
  );
};
