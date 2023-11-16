import { useRef } from "react";
import Select, { SingleValue } from "react-select";

export const SortComponent = ({ products, setProducts }: any) => {
  const selectRef = useRef<any>();
  const sortOptions = [
    { value: "low to high", label: "السعر: من الاقل إلى الاعلى" },
    { value: "high to low", label: "السعر: من الاعلى إلى الاقل" },
    { value: "new to old", label: "وصل حديثا" },
  ];
  const handleSorting = (e: SingleValue<{ value: string; label: string }>) => {
    if (e?.value === "low to high") {
      const sortedProducts = products?.sort(
        (a: any, b: any) => +a.productPrice - +b.productPrice
      );
      setProducts([...sortedProducts]);
    }
    if (e?.value === "high to low") {
      const sortedProducts = products?.sort(
        (a: any, b: any) => +b.productPrice - +a.productPrice
      );
      setProducts([...sortedProducts]);
    }
    if (e?.value === "new to old") {
      const sortedProducts = products?.sort(
        (a: any, b: any) => b.generatedAt - a.generatedAt
      );
      setProducts([...sortedProducts]);
    }
  };

  return (
    <>
      <Select
        ref={selectRef}
        className="basic-single"
        name="color"
        options={sortOptions}
        onChange={(e) => handleSorting(e)}
      />
    </>
  );
};
