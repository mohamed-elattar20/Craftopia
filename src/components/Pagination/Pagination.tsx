// React
import { useEffect, useState } from "react";
// React Paginate
import ReactPaginate from "react-paginate";

export type PaginationProps = {
  filterdProducts: any;
  setProducts: any;
  itemOffset: any;
  setItemOffset: any;
};
const Pagination = ({
  filterdProducts,
  setProducts,
  itemOffset,
  setItemOffset,
}: PaginationProps) => {
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;

  // console.log(filterdProducts);

  useEffect(() => {
    if (filterdProducts) {
      const endOffset = itemOffset + itemsPerPage;
      const currentItems: any = filterdProducts?.slice(itemOffset, endOffset);

      if (filterdProducts?.length) {
        setPageCount(Math.ceil(filterdProducts?.length / itemsPerPage));
      }
      setProducts(currentItems && [...currentItems]);
    }
  }, [itemOffset, filterdProducts, setProducts]);

  const handlePageClick = (event: any) => {
    if (filterdProducts?.length) {
      const newOffset =
        (event.selected * itemsPerPage) % filterdProducts?.length;
      setItemOffset(newOffset);
    }
  };
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="التالي"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="السابق"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default Pagination;
