import "./Cart.css";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { deleteField, updateDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const ProductsTable = () => {
  const steps = ["تحكم في مشترياتك", "أكمل تسجيل بياناتك", "التقدم للدفع"];
  const { myUser, authUser, userRef } = useContext(UserContext);
 

  let cartItems;
  if (authUser) {
    const cartKeys = Object.keys(authUser[0]?.cart);
    cartItems = cartKeys.map((key, index) => {
      const setQuantity = (e: any) => {
        if (userRef && authUser) {
          updateDoc(userRef, {
            cart: {
              ...authUser[0]?.cart,
              [key]: {
                ...authUser[0]?.cart[key],
                quantity:
                  e.target?.attributes[0].value === "increase"
                    ? authUser[0]?.cart[key].quantity + 1
                    : authUser[0]?.cart[key].quantity > 1
                    ? authUser[0]?.cart[key].quantity - 1
                    : 1,
              },
            },
          });
        }
      };

      const removeProduct = async () => {
        if (userRef) {
          await updateDoc(userRef, {
            [`cart.${key}`]: deleteField(),
          }).then(() => {
            console.log("success");
          });
        }
      };

      return (
        <tr key={index}>
          <th scope="row">
            <div style={{ width: "100px" }}>
              <img
                src={authUser[0]?.cart[key].productImages[0].imgUrl}
                alt="wallet"
                className="img-fluid"
              />
            </div>
          </th>
          <td>{authUser[0]?.cart[key].productTitle}</td>
          <td>EGP {authUser[0]?.cart[key].productPrice}</td>
          <td className="action-buttons">
            <button
              data-functionality="increase"
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => setQuantity(e)}
            >
              +
            </button>
            <span className="px-3">{authUser[0]?.cart[key].quantity}</span>
            <button
              data-functionality="decrease"
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => setQuantity(e)}
            >
              -
            </button>
          </td>
          <td>
            EGP{" "}
            {authUser[0]?.cart[key].productPrice *
              authUser[0]?.cart[key].quantity}
          </td>
          <td>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={removeProduct}
            ></button>
          </td>
        </tr>
      );
    });
  }


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
        <tbody>{cartItems}</tbody>
      </table>
    </div>
  );
};
