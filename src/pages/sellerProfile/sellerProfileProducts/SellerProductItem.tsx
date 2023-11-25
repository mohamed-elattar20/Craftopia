import { ProductType } from "../../../Types/ProductType";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase.config";
import { SellerProductModal } from "./SellerProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { firestore } from "../../../firebase/firebase";

type sellerProductProps = {
  productItem: ProductType;
};

export const SellerProductItem = ({ productItem }: sellerProductProps) => {
  // const [isAvailable, setIsAvailable] = useState(productItem.isAvailable);
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

  const handleAvaliabilty = (product: ProductType) => {
    updateDoc(doc(firestore, "products", product.productId), {
      ...product,
      isAvailable: !product.isAvailable,
    });
    // setIsAvailable((prev) => !prev);
  };

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
      <td className="col text-center">
        <input
          type="checkbox"
          checked={productItem.isAvailable ?? false}
          onChange={() => handleAvaliabilty(productItem)}
        />
      </td>
      <td className="col">
        <SellerProductModal
          productItem={productItem}
          key={productItem.productId}
        />
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
