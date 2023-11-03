import ProductCard from "../../components/ProductCard/ProductCard";

const StorePage = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Example for looping
  return (
    <>
      <div className="text-center mt-5 bg-primary text-light py-5">
        <h1 className="display-3 fw-medium mb-3">مرحبا بك في المتجر</h1>
        <h5 className="display-6 ">Store</h5>
      </div>
      <div className="container my-5">
        <div className="row justify-content-center text-center">
          <h2 className="text-center display-5 mb-3">الفئات</h2>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0">
              أزياء
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0">
              تصميم
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 rounded-pill fs-3 text-light border-0">
              مواد طبيعية
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0">
              خرز
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 py-2 rounded-pill fs-3 text-light border-0">
              خيوط
            </button>
          </div>
          <div className="col-6 col-md-4 col-lg-4 mb-2">
            <button className="btn btn-secondary px-4 rounded-pill fs-3 text-light border-0">
              مواد كيميائية
            </button>
          </div>
        </div>
        <div className="row my-5 g-3">
          {arr.map((prod) => (
            <div key={prod} className="col-6 col-md-6 col-lg-3">
              <ProductCard />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StorePage;
