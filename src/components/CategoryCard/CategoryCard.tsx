import { NavLink } from "react-router-dom";

type CategoryCardProps = {
  img: string;
  categoryType: string;
};

const CategoryCard = ({ img, categoryType }: CategoryCardProps) => {
  const state = categoryType !== "للمزيد اضغط هنا" ? categoryType : null;

  return (
    <>
      <div className="card rounded-2 border-0">
        <NavLink
          to={{ pathname: `/store` }}
          state={state}
          className="d-flex flex-column gap-3"
        >
          <div>
            <img
              src={img}
              className="card-img-top rounded-2"
              alt="category-img"
            />
          </div>
          <div className="card-body text-center p-1">
            <h4 className="card-title m-0">{categoryType}</h4>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default CategoryCard;
