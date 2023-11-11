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
        <NavLink to={{ pathname: `/store` }} state={state}>
          <img
            src={img}
            className="card-img-top rounded-2"
            alt="category-img"
          />
        </NavLink>
        <div className="card-body text-center">
          <h4 className="card-title">{categoryType}</h4>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
