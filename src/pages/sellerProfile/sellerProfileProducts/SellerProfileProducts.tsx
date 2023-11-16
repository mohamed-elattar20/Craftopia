import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { productsColRef } from "../../../firebase/firebase.config";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Timestamp, doc, query, setDoc, where } from "firebase/firestore";
import { ChangeEvent, useContext, useState } from "react";
import { storage } from "../../../firebase/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import { v4 } from "uuid";
import { SellerProductItem } from "./SellerProductItem";
import { ProductType, ImageObj } from "../../../Types/ProductType";
import Select from "react-select";
import { firestore } from "../../../firebase/firebase";
import "./SellerProfileProducts.css";
import { UserContext } from "../../../Contexts/UserContext";

export const SellerProfileProducts = () => {
  const [productImages, setProductImages] = useState<ImageObj[]>([]);

  const { currentUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    setValue,
  } = useForm<ProductType>();

  const [uploadFile, uploading, , errorUploading] = useUploadFile();

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
  };
  const deleteImage = (id: string) => {
    setProductImages((prev) => prev.filter((img) => img.imgId !== id));
    if (productImages.length === 1) {
      setValue("productImage", null);
    }
  };

  const onSubmit: SubmitHandler<ProductType> = async (data) => {
    for (let i = 0; i < productImages.length; i++) {
      const img = productImages[i];
      const productImageRef = ref(storage, `products images/${img.imgId}`);

      if (img.imgFile) {
        await uploadFile(productImageRef, img.imgFile, {
          contentType: img.imgFile?.type,
        });
        const imgUrl = await getDownloadURL(productImageRef);
        img.imgUrl = imgUrl;
        delete img.imgFile;
      }
    }

    const productId = v4();
    console.log(productImages);

    setDoc(doc(firestore, "products", productId), {
      productTitle: data.productTitle,
      productPrice: data.productPrice,
      productDescription: data.productDescription,
      productCategory: {
        value: data.productCategory?.value,
        label: data.productCategory?.label,
      },
      discount: +data.discount || 0,
      productImages,
      sellerId: currentUser?.uId,
      brand: currentUser?.displayName,
      productId,
      generatedAt: Timestamp.now(),
      rating: "",
      reviewes: [],
    });
    console.log(data);

    reset();
    reset({ productCategory: null });
    setProductImages([]);
  };

  const handleClose = () => {
    reset();
    reset({ productCategory: null });
    setProductImages([]);
  };

  const sellerProductsColRef =
    currentUser &&
    query(productsColRef, where("sellerId", "==", currentUser?.uId));

  const [products, loading, error] = useCollectionData(sellerProductsColRef);

  console.log(products);

  const categories = [
    { value: "مواد طبيعية", label: "مواد طبيعية" },
    { value: "مواد كيميائية", label: "مواد كيميائية" },
    { value: "خرز", label: "خرز" },
    { value: "خيوط", label: "خيوط" },
    { value: "تصميم", label: "تصميم" },
    { value: "أزياء", label: "أزياء" },
  ];

  return (
    <div className="containr w-100 overflow-hidden">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        إضافة منتج
      </button>

      {error && <p>{error.message}</p>}

      {loading ? (
        <p>loading ...</p>
      ) : products && products.length > 0 ? (
        <table className="tabel w-100 ">
          <thead>
            <tr className="row border-bottom py-2 align-items-center">
              <th className="col">اسم المنتج</th>
              <th className="col">التصنيف</th>
              <th className="col text-center">السعر</th>
              <th className="col text-center">الصورة</th>
              <th className="col text-center">تعديل</th>
              <th className="col text-center">إزالة</th>
            </tr>
          </thead>
          <tbody>
            {products.map((doc) => (
              <SellerProductItem
                key={doc.id}
                productItem={doc as ProductType}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>لا يوجد منتجات</p>
      )}

      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="staticBackdropLabel"
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
                    key="add"
                    control={control}
                    {...register("productCategory", {
                      required: "برجاء اختيار تصنيف المنتج",
                    })}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categories}
                        placeholder="اختر"
                      />
                    )}
                  />
                  {errors.productCategory && (
                    <p className="text-danger ">
                      {errors.productCategory.message}
                    </p>
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
                      productImages.length < 2
                        ? "btn btn-outline-secondary"
                        : "btn-disabled"
                    }
                    htmlFor={productImages.length < 2 ? "productImage" : ""}
                  >
                    إضافة صورة
                  </label>
                  <input
                    id="productImage"
                    type="file"
                    hidden
                    accept=".png, .jpg, .jpeg"
                    {...register("productImage", {
                      required: true,
                      validate: {
                        hasValue: (file) => file !== null,
                      },
                      onChange: (event) => handleUpload(event),
                    })}
                  />
                  {errors.productImage && (
                    <p className=" text-danger">برجاء إدخال صورة المنتج</p>
                  )}

                  {/* <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={chooseImage}
                    disabled={productImages?.length === 5}
                  >
                    إضافة صورة
                  </button> */}
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
                    onClick={handleClose}
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
