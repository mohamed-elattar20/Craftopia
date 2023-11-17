// React
import { useEffect, useState } from "react";
// React Paginate
import ReactPaginate from "react-paginate";

export type PaginationProps = {
  filterdProducts?: any;
  setProducts?: any;
  itemOffset: any;
  setItemOffset: any;
};
const Pagination = ({
  filterdProducts,
  setProducts,
  itemOffset,
  setItemOffset,
}: PaginationProps) => {
  //   const [itemOffset, setItemOffset] = useState(0);
  const [pageCoun, setPageCount] = useState(0);
  const itemsPerPage = 5;
  useEffect(() => {
    console.log(itemOffset);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems: any = filterdProducts?.slice(itemOffset, endOffset);

    if (filterdProducts?.length) {
      setPageCount(Math.ceil(filterdProducts?.length / itemsPerPage));
    }
    // const pageCount = Math.ceil(products.length / itemsPerPage);
    setProducts(currentItems && [...currentItems]);
  }, [itemOffset, filterdProducts, pageCoun]);

  const handlePageClick = (event: any) => {
    if (filterdProducts?.length) {
      const newOffset =
        (event.selected * itemsPerPage) % filterdProducts?.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
  };
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCoun}
        previousLabel="< previous"
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
