// Components
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
// imgs
import gems from "../../../assets/images/Categories/gems.png";
import candles from "../../../assets/images/Categories/candles.png";
import crochet from "../../../assets/images/Categories/crochet.png";
import forMore from "../../../assets/images/Categories/for_more.png";
const Categories = () => {
  const categories = [
    { categoryType: "مواد طبيعية", img: gems },
    { categoryType: "مواد كيميائية", img: candles },
    { categoryType: "مواد خيوط", img: crochet },
    { categoryType: "للمزيد اضغط هنا", img: forMore },
  ];
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <h2 className="display-5">تسوق حسب الفئة</h2>
          {categories.map((category) => (
            <div
              className="col-6 col-md-6 col-lg-3 mt-5"
              key={category.categoryType}
            >
              <CategoryCard
                img={category.img}
                categoryType={category.categoryType}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
