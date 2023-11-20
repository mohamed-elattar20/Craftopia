import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useUploadFile } from "react-firebase-hooks/storage";
import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState, useEffect } from "react";
import { storage } from "../../../firebase/firebase.config";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import Select from "react-select";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductType, ImageObj } from "../../../Types/ProductType";
import { firestore } from "../../../firebase/firebase";

type SellerProductModalProps = {
  productItem: ProductType;
};

export const SellerProductModal = ({
  productItem,
}: SellerProductModalProps) => {
  const [productImages, setProductImages] = useState<ImageObj[]>([]);

  const [uploadFile, uploading, , errorUploading] = useUploadFile();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<ProductType>({
    defaultValues: productItem,
  });

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.files) {
      let imgFile = e?.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (e) => {
        const imgUrl = e.target?.result;
        const imgId = v4();
        setProductImages((prev) => [...prev, { imgId, imgUrl, imgFile }]);
      };
    }

    reset({
      imgsNum: productImages.length + 1,
    });
  };

  const deleteImage = (id: string) => {
    setProductImages((prev) => prev.filter((obj) => obj.imgId !== id));
    reset({
      imgsNum: productImages.length - 1,
    });
  };

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    if (productItem.productId) {
      const imagesToBeDeleted = productItem.productImages.filter(
        (obj1) =>
          !productImages.some(
            (obj2) => obj1.imgId === obj2.imgId && obj1.imgUrl === obj2.imgUrl
          )
      );
      imagesToBeDeleted.map(async (obj) => {
        await deleteObject(ref(storage, `products images/${obj.imgId}`));
      });
      for (let i = 0; i < productImages.length; i++) {
        let obj1 = productImages[i];
        let isExist = productItem.productImages.some(
          (obj2) => obj1.imgId === obj2.imgId && obj1.imgUrl === obj2.imgUrl
        );
        if (!isExist) {
          obj1.imgFile &&
            (await uploadFile(
              ref(storage, `products images/${obj1.imgId}`),
              obj1.imgFile,
              { contentType: obj1.imgFile?.type }
            ));
          const url = await getDownloadURL(
            ref(storage, `products images/${obj1.imgId}`)
          );
          obj1.imgUrl = url;
          delete obj1.imgFile;
        }
      }
      const docRef = doc(firestore, "products", productItem.productId);
      updateDoc(docRef, {
        ...productItem,
        productTitle: data.productTitle,
        productPrice: +data.productPrice,
        productDescription: data.productDescription,
        productCategory: {
          value: data.productCategory?.value,
          label: data.productCategory?.label,
        },
        discount: +data.discount || 0,
        priceAfterDiscount:
          +data.productPrice * (1 - (+data.discount / 100 || 0)),
        productImages,
      });
    }
    console.log(data);
  };

  const categories = [
    { value: "مواد طبيعية", label: "مواد طبيعية" },
    { value: "مواد كيميائية", label: "مواد كيميائية" },
    { value: "خرز", label: "خرز" },
    { value: "خيوط", label: "خيوط" },
    { value: "تصميم", label: "تصميم" },
  ];

  useEffect(() => {
    reset({
      imgsNum: productItem.productImages.length,
    });
    setProductImages(productItem.productImages);
  }, [productItem]);

  return (
    <div>
      <div className="text-center">
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faPenToSquare}
          data-bs-toggle="modal"
          data-bs-target={`#a${productItem.productId}`}
          onClick={() => {
            setProductImages(productItem.productImages);
            reset({
              imgsNum: productItem.productImages.length,
            });
          }}
        />
      </div>
      <div
        className="modal fade"
        id={`a${productItem.productId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="staticBackdropLabel2"
              >
                بيانات المنتج
              </h1>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label htmlFor="productTitle" className="form-label">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productTitle"
                    {...register("productTitle", {
                      required: "برجاء إدخال اسم المنتج",
                    })}
                  />
                  {errors.productTitle && (
                    <p className=" text-danger">
                      {errors.productTitle.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="productCategory" className="form-label">
                    اختر تصنيف المنتج
                  </label>
                  <Controller
                    key={productItem.productId}
                    name="productCategory"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} options={categories} />
                    )}
                  />
                  {errors.productCategory && (
                    <p className="text-danger ">برجاء اختيار تصنيف المنتج</p>
                  )}
                </div>
                <div>
                  <label htmlFor="productPrice" className="form-label">
                    السعر
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="productPrice"
                    {...register("productPrice", {
                      required: "برجاء إدخال سعر المنتج",
                      pattern: {
                        value: /\b([1-9]\d{0,4}|100000)\b/,
                        message: "برجاء إدخال رقم صحيح",
                      },
                    })}
                  />
                  {errors.productPrice && (
                    <p className="text-danger">{errors.productPrice.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="discount" className="form-label">
                    الخصم
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="discount"
                    {...register("discount", {
                      pattern: {
                        value: /^(?:\d|[1-9]\d|100)$/,
                        message: "برجاء إدخال رقم بين 0 إلى 100",
                      },
                    })}
                  />
                  {errors.discount && (
                    <p className=" text-danger">{errors.discount.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="productDescription" className="form-label">
                    وصف المنتج
                  </label>
                  <textarea
                    className="form-control "
                    id="productDescription"
                    {...register("productDescription", {
                      required: "برجاء إدخال وصف المنتج",
                    })}
                  ></textarea>
                  {errors.productDescription && (
                    <p className=" text-danger">
                      {errors.productDescription.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className={
                      productImages.length < 5
                        ? "btn btn-outline-secondary"
                        : "btn-disabled"
                    }
                    htmlFor={
                      productImages.length < 5
                        ? `productImage${productItem.productId}`
                        : ""
                    }
                  >
                    إضافة صورة
                  </label>
                  <input
                    type="number"
                    hidden
                    {...register("imgsNum", {
                      required: true,
                      validate: { hasValue: (file) => file !== 0 },
                    })}
                  />
                  {errors.imgsNum && (
                    <p className=" text-danger">برجاء إدخال صورة المنتج</p>
                  )}
                  <input
                    id={`productImage${productItem.productId}`}
                    type="file"
                    hidden
                    accept=".png, .jpg, .jpeg"
                    onChange={(event) => handleUpload(event)}
                  />
                </div>
                {errorUploading && (
                  <strong>Error: {errorUploading.message}</strong>
                )}
                {uploading && <span>Uploading file...</span>}
                {productImages?.length > 0 && (
                  <div className=" d-flex gap-3">
                    {productImages.map((img) => (
                      <div key={img.imgId} className="position-relative ">
                        <img
                          className="rounded-2"
                          src={img.imgUrl}
                          alt=""
                          style={{ width: "100px" }}
                        />
                        <button
                          onClick={() => deleteImage(img.imgId)}
                          className="btn btn-danger rounded-circle d-flex justify-content-center align-items-center position-absolute"
                          style={{
                            width: "25px",
                            height: "25px",
                            top: "-12.5px",
                          }}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    data-bs-dismiss={isValid ? "modal" : ""}
                  >
                    حفظ
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    غلق
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
