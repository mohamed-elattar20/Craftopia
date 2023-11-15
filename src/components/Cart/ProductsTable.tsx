import Wallet from "../../assets/images/Product Details/wallet.png";
import "./Cart.css";

export const ProductsTable = () => {
  const steps = ["تحكم في مشترياتك", "أكمل تسجيل بياناتك", "التقدم للدفع"];

  return (
    <div className="table-responsive">
      <table className="table text-center align-middle table-hover table-sm">
        <thead className="table-light">
          <tr>
            <th scope="col">المنتج</th>
            <th scope="col">التفاصيل</th>
            <th scope="col">السعر</th>
            <th scope="col">الكمية</th>
            <th scope="col">الاجمالي</th>
            <th scope="col">حذف</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <div style={{ width: "100px" }}>
                <img src={Wallet} alt="wallet" className="img-fluid" />
              </div>
            </th>
            <td>إناء مصنوع من الفخار بجودة عالية مع بعض الزخارف والزينة</td>
            <td>200EGP</td>
            <td className="action-buttons">
              <button type="button" className="btn btn-outline-primary">
                +
              </button>
              <span className="px-3">3</span>
              <button type="button" className="btn btn-outline-primary">
                -
              </button>
            </td>
            <td>600EGP</td>
            <td>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div style={{ width: "100px" }}>
                <img src={Wallet} alt="wallet" className="img-fluid" />
              </div>
            </th>
            <td>إناء مصنوع من الفخار بجودة عالية مع بعض الزخارف والزينة</td>
            <td>200EGP</td>
            <td>
              <button type="button" className="btn btn-outline-primary">
                +
              </button>
              <span className="px-3">3</span>
              <button type="button" className="btn btn-outline-primary">
                -
              </button>
            </td>
            <td>600EGP</td>
            <td>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
