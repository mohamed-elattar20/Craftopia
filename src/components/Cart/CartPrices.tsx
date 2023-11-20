import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";

interface CartPurchasesProps {
  nextPage: (value: number) => void;
}

export const CartPrices = ({ nextPage }: CartPurchasesProps) => {
  const { currentUser, myUser, authUser, userRef } = useContext(UserContext);
  let total: number = 0;
  if (authUser) {
    const cartKeys = Object.keys(authUser[0]?.cart);
    cartKeys.forEach((key, index) => {
      total +=
        authUser[0]?.cart[key].productPrice * authUser[0]?.cart[key].quantity;
    });
  }

  return (
    <>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title pb-3 text-center">إجمالي سلة المشتريات</h5>
          <div className="d-flex justify-content-between py-3 border-bottom">
            <h6 className="card-subtitle mb-2">المجموع</h6>
            <h6 className="card-subtitle mb-2">EGP {total}</h6>
          </div>
          <div className="d-flex justify-content-between pt-3  border-bottom">
            <h6 className="card-subtitle mb-2">الشحن</h6>
            <h6 className="card-subtitle mb-2">EGP 60</h6>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <h5 className="card-subtitle mb-2">الاجمالي</h5>
            <h5 className="card-subtitle mb-2">EGP {total + 60}</h5>
          </div>
        </div>
        <button
          className="btn btn-secondary my-2 mx-3"
          type="submit"
          onClick={() => nextPage(1)}
        >
          اتمام الطلب
        </button>
      </div>
    </>
  );
};
