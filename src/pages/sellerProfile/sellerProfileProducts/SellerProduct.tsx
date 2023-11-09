import { sellerProductType } from "../../../Types/SellerProduct";
import { useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase.config";

type sellerProductProps = {
  item: {
    productTitle: string;
    productPrice: string;
    productDescription: string;
    productImages: { imgId: string; imgUrl: string }[];
  };
  id: string;
};

export const SellerProduct = ({ item, id }: sellerProductProps) => {
  useEffect(() => {}, [item]);

  const deleteProduct = async () => {
    await deleteDoc(doc(db, "products", id));
    item.productImages?.map((img) => {
      let imgRef = ref(storage, `products images/${img.imgId}`);
      deleteObject(imgRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="col">
      <div>
        {item.productImages?.map((img) => (
          <div key={img.imgId}>
            <img src={img.imgUrl} alt="" style={{ maxWidth: "200px" }} />
          </div>
        ))}
      </div>
      <div>
        <h4>{item.productTitle}</h4>
        <p>{item.productDescription}</p>
      </div>

      <div>
        <button className="btn btn-secondary">تعديل</button>
        <button className="btn btn-danger" onClick={() => deleteProduct()}>
          إزالة
        </button>
      </div>
    </div>
  );
};
