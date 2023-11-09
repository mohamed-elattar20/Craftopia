interface CartPurchasesProps {
  nextPage: (value: number) => void;
}

export const CartPrices = ({ nextPage }: CartPurchasesProps) => {
  return (
    <>
      <div className="card col-12 col-md-4 mx-auto my-3">
        <div className="card-body">
          <h5 className="card-title pb-3 text-center">إجمالي سلة المشتريات</h5>
          <div className="d-flex justify-content-between py-3 border-bottom">
            <h6 className="card-subtitle mb-2">المجموع</h6>
            <h6 className="card-subtitle mb-2">1200EGP</h6>
          </div>
          <div className="d-flex justify-content-between pt-3  border-bottom">
            <h6 className="card-subtitle mb-2">الشحن</h6>
            <h6 className="card-subtitle mb-2">60EGP</h6>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <h5 className="card-subtitle mb-2">الاجمالي</h5>
            <h5 className="card-subtitle mb-2">1260EGP</h5>
          </div>
        </div>
      </div>
      <div className="mx-auto text-center">
        <button
          className="btn btn-primary my-2 mx-3"
          type="submit"
          onClick={() => nextPage(1)}
        >
          اتمام الطلب
        </button>
      </div>
    </>
  );
};
