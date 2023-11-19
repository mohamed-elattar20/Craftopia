import { useContext } from "react";
import { UserProfileOrder } from "../../../components/UserProfileOrder/UserProfileOrder";
import { UserProfileTaps } from "../userProfileTaps/UserProfileTaps";
import { UserContext } from "../../../Contexts/UserContext";
import { query, where } from "@firebase/firestore";
import { ordersRef } from "../../../firebase/firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Spinner } from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

export const UserProfileOrders = () => {
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const currentUserOrders = query(
    ordersRef,
    where("clientId", "==", currentUser?.uId)
  );
  const [currentUserOrdersData, loading] = useCollectionData(currentUserOrders);
  // console.log(currentUserOrdersData);

  return (
    <div className="user-profile border py-5 px-2 px-sm-5 rounded-4 flex-grow-1">
      <h2 className="text-center my-4">الطلبات</h2>
      {loading ? (
        <div className="h-100 d-flex justify-content-center">
          <Spinner />
        </div>
      ) : currentUserOrdersData?.length && currentUserOrdersData?.length > 0 ? (
        currentUserOrdersData?.map((order) => (
          <div
            key={order.orderId}
            className="border border-2 my-3 p-3 rounded-3"
          >
            <p className="lead mb-2">رقم الطلب :{order.orederId} </p>
            <p className="lead mb-2">
              حالة الطلب :{" "}
              {order.status === "pending" ? `جاري تجهيز الشحنة` : `تم التوصيل`}
            </p>
            <p className="lead mb-2">السعر الكلي : EGP {order.totalPrice}</p>
            <p className="lead mb-2">
              تاريخ الطلب :{" "}
              {new Date(
                order.orderAt.seconds * 1000 +
                  order.orderAt.nanoseconds / 1000000
              ).toDateString()}
            </p>
            {Object.values(order.products).map((productOrder: any) => (
              <div className="my-2">
                <UserProfileOrder
                  productOrder={productOrder}
                  orderStatus={order.status}
                />
              </div>
            ))}
          </div>
        ))
      ) : (
        <>
          <h2 className="display-5 ">لا توجد طلبات</h2>
          <Link className="btn btn-primary" to={`/store`}>
            اطلب الآن
          </Link>
        </>
      )}
      {/* {!loading ? (
        currentUserOrdersData?.map((order) => (
          <div className="border border-2 my-3 p-3 rounded-3">
            <p className="lead mb-2">رقم الطلب :{order.orederId} </p>
            <p className="lead mb-2">
              حالة الطلب :
              {order.status === "pending" ? `جاري تجهيز الشحنة` : `تم التوصيل`}{" "}
            </p>
            <p className="lead mb-2">السعر الكلي : EGP {order.totalPrice}</p>
            <p className="lead mb-2">
              تاريخ الطلب :{" "}
              {new Date(
                order.orderAt.seconds * 1000 +
                  order.orderAt.nanoseconds / 1000000
              ).toDateString()}
            </p>
            {Object.values(order.products).map((productOrder: any) => (
              <div className="my-2">
                <UserProfileOrder
                  productOrder={productOrder}
                  orderStatus={order.status}
                />
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="h-100 d-flex justify-content-center">
          <Spinner />
        </div>
      )} */}
    </div>
  );
};
