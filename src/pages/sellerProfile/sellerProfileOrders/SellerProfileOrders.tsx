import { DocumentData, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { postsCollRef } from "../../../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import Post from "../../../components/community/Post";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { Spinner } from "../../../components/Spinner/Spinner";

const SellerProfileOrders = () => {
  const { myUser, authUser } = useContext(UserContext);
  const [requestedProducts, setRequestedProducts] = useState<
    Array<DocumentData>
  >([]);
  const [loading, setLoading] = useState(true);
  const getOrders = async () => {
    if (authUser && authUser[0]) {
      const currentSellerProducts: Array<DocumentData> = [];
      const querySnapshot = await getDocs(collection(db, "orders")).finally(
        () => {
          setLoading(false);
        }
      );
      console.log(querySnapshot);

      querySnapshot.forEach((doc) => {
        let products = doc.data()["products"];
        if (products) {
          for (let productId of Object.keys(products)) {
            // console.log(productId, "=>", products[productId]);
            if (products[productId]["sellerId"] === authUser[0]["uId"]) {
              products[productId]["orderId"] = doc.id;
              currentSellerProducts.push(products[productId]);
            }
          }
        }
      });
      setRequestedProducts((old) => currentSellerProducts);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="d-flex flex-column">
      {loading ? (
        <div className="h-100 d-flex justify-content-center">
          <Spinner />
        </div>
      ) : requestedProducts && requestedProducts.length > 0 ? (
        requestedProducts.map((product) => {
          return (
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
              <h3 className="lead fw-regular">
                {"رقم الطلب : " + product["orderId"]}
              </h3>
              <div className="d-flex gap-3 align-items-center">
                <div
                  className="order-img w-25 rounded-3 order-2 order-sm-1 rounded-3"
                  style={{
                    overflow: "hidden",
                    minWidth: "80px",
                    maxWidth: "200px",
                  }}
                >
                  <img
                    src={product["productImages"][0]["imgUrl"]}
                    alt=""
                    style={{}}
                  />
                </div>
                <div className="order-1 order-sm-2 w-75 text-center text-sm-end">
                  <p className="fs-5">{product["productTitle"]}</p>
                  <p>الكمية : {product["quantity"]}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>لا يوجد طلبات حتى الآن</h2>
      )}
    </div>
  );
};

export default SellerProfileOrders;
