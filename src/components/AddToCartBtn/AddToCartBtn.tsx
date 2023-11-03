// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const AddToCartBtn = () => {
  return (
    <>
      <button className="btn btn-primary ">
        أضف الى السلة
        <FontAwesomeIcon className="me-1 me-md-2" icon={faShoppingCart} />
      </button>
    </>
  );
};

export default AddToCartBtn;
