import { doc, updateDoc } from "firebase/firestore";
import { ProductType } from "../../Types/ProductType";
import item from "../../assets/images/User Profile/product.jpeg";
import "./userProfileOrder.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { firestore } from "../../firebase/firebase";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { validate } from "uuid";

type UserProfileOrderProps = {
  productOrder: ProductType;
  orderStatus: string;
};
type ReviewForm = {
  review: string;
  rating: any;
};
const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
export const UserProfileOrder = ({
  productOrder,
  orderStatus,
}: UserProfileOrderProps) => {
  const [value, setValue] = useState<number | null>(null);
  const [hover, setHover] = useState(-1);
  // console.log(productOrder);
  const { currentUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<ReviewForm>();

  const onSubmit = (data: any) => {
    console.log(data);

    if (currentUser) {
      updateDoc(doc(firestore, "products", productOrder.productId), {
        ...productOrder,
        rating:
          productOrder.rating !== 0
            ? (productOrder.rating + data.rating) / 2
            : data.rating,
        ratingCount: productOrder.ratingCount + 1,
        reviewes: [
          ...productOrder?.reviewes,
          data.review !== "" && {
            displayName: currentUser?.displayName,
            reviewContent: data.review,
            userAvatarURL: currentUser?.avatarURL || "",
            reviewId: crypto.randomUUID(),
            rating: data.rating,
          },
        ],
      }).then(() => notify());
    }

    reset();
  };
  const notify = () =>
    toast.success("تم إضافة تقييمك بنجاح", {
      position: "top-left",
      autoClose: 600,
      hideProgressBar: true,
      closeOnClick: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      pauseOnHover: false,
      rtl: true,
    });

  return (
    <>
      <ToastContainer
        newestOnTop
        autoClose={600}
        closeOnClick
        rtl={true}
        theme="light"
        hideProgressBar
        toastClassName={`shadow-sm `}
      />
      <div className=" shadow-sm rouded-3 p-2 user-profile-order d-flex flex-column flex-sm-row gap-3 w-100 align-items-center align-items-sm-start">
        <div
          className="order-img w-25 rounded-3 order-2 order-sm-1 rounded-3"
          style={{ overflow: "hidden", minWidth: "80px", maxWidth: "200px" }}
        >
          <img src={productOrder.productImages[0].imgUrl} alt="" style={{}} />
        </div>
        <div className="order-1 order-sm-2 w-75 text-center text-sm-end">
          <h4 className="fs-5"> {productOrder.productTitle} </h4>
          <p className="">الكمية : {productOrder.quantity}</p>
          <p className="">سعر المنتج : EGP {productOrder.productPrice}</p>
        </div>

        <div
          className="align-self-sm-end text-center order-3"
          style={{ minWidth: "fit-content" }}
        >
          {orderStatus === "pending" ? (
            ""
          ) : (
            <div className="d-flex flex-column gap-3">
              <button
                className="btn btn-secondary text-white"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#a${productOrder.productId}`}
              >
                إضافة تقييم
              </button>

              <div
                className="modal fade"
                id={`a${productOrder.productId}`}
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
                        <input
                          type="number"
                          hidden
                          {...register("rating", {
                            validate: { hasValue: (file) => file !== "" },
                          })}
                        />
                        <div>
                          <Box
                            sx={{
                              width: 200,
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row-reverse",
                              direction: "ltr",
                            }}
                          >
                            <Rating
                              style={{ height: "1.5rem" }}
                              name="hover-feedback"
                              value={value}
                              precision={0.5}
                              getLabelText={getLabelText}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                                reset({ rating: hover });
                              }}
                              onChangeActive={(event, newHover) => {
                                setHover(newHover);
                              }}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />

                            {value !== null && (
                              <Box sx={{ ml: 2 }}>
                                {labels[hover !== -1 ? hover : value]}
                              </Box>
                            )}
                          </Box>
                          {errors.rating && (
                            <p className=" text-danger text-end">
                              برجاء تقييم المنتج
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="review"
                            className="form-label text-end w-100"
                          >
                            اضف تقييم
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="review"
                            {...register("review")}
                            // {...register("review", {
                            //   required: "برجاء إضافة تقييم المنتج",
                            // })}
                          />
                          {/* {errors.review && (
                            <p className=" text-danger text-end">
                              {errors.review.message}
                            </p>
                          )} */}
                        </div>
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
                            onClick={() => {
                              reset();
                              setValue(null);
                              reset({ rating: "" });
                            }}
                          >
                            غلق
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-secondary text-white">
                إرجاع المنتج
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
