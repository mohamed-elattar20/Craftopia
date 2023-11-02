import ProductCard from "../../../components/ProductCard/ProductCard";

const LatestOffers = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row text-center g-3">
          <h2 className="display-4">عروض اليوم</h2>
          <p className="my-2 lead">خصومات تصل الى 30%</p>
          <div className="col-6 col-md-6 col-lg-3">
            <ProductCard />
          </div>
          <div className="col-6 col-md-6 col-lg-3">
            <ProductCard />
          </div>
          <div className="col-6 col-md-6 col-lg-3">
            <ProductCard />
          </div>
          <div className="col-6 col-md-6 col-lg-3">
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestOffers;
