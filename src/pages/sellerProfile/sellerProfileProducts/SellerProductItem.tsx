import { ProductType } from "../../../Types/ProductType";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase.config";
import { SellerProductModal } from "./SellerProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

type sellerProductProps = {
  productItem: ProductType;
};

export const SellerProductItem = ({ productItem }: sellerProductProps) => {
  const deleteProduct = async () => {
    await deleteDoc(doc(db, "products", productItem.productId));
    productItem.productImages?.map((obj) => {
      let imgRef = ref(storage, `products images/${obj.imgId}`);
      deleteObject(imgRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  console.log(productItem);

  return (
    <tr className="row border-bottom py-2 align-items-center">
      <td className="col seller-product-tilte">{productItem?.productTitle}</td>
      <td className="col text-center ">
        {productItem?.productCategory?.label}
      </td>
      <td className="col text-center">{productItem?.productPrice}</td>
      <td className="col">
        <div className="text-center">
          <img
            className="d-inline-block"
            src={
              productItem?.productImages && productItem.productImages[0].imgUrl
            }
            alt=""
            style={{ maxWidth: "60px" }}
          />
        </div>
      </td>
      <td className="col">
        <SellerProductModal productItem={productItem} />
      </td>
      <td className="col text-danger text-center">
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => deleteProduct()}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  );
};
