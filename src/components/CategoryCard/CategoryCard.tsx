type CategoryCardProps = {
  img: string;
  categoryType: string;
};

const CategoryCard = ({ img, categoryType }: CategoryCardProps) => {
  return (
    <>
      <div className="card rounded-2 border-0">
        <a href="#">
          <img
            src={img}
            className="card-img-top rounded-2"
            alt="category-img"
          />
        </a>
        <div className="card-body text-center">
          <h4 className="card-title">{categoryType}</h4>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
