// Components
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
// imgs
import gems from "../../../assets/images/Categories/gems.png";
import candles from "../../../assets/images/Categories/candles.png";
import crochet from "../../../assets/images/Categories/crochet.png";
import forMore from "../../../assets/images/Categories/for_more.png";
const Categories = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <h2 className="display-5">تسوق حسب الفئة</h2>
          <div className="col-6 col-md-6 col-lg-3 mt-5">
            <CategoryCard img={gems} categoryType="مواد طبيعية" />
          </div>
          <div className="col-6 col-md-6 col-lg-3 mt-5">
            <CategoryCard img={candles} categoryType="مواد كيميائية" />
          </div>
          <div className="col-6 col-md-6 col-lg-3 mt-5">
            <CategoryCard img={crochet} categoryType="خيوط" />
          </div>
          <div className="col-6 col-md-6 col-lg-3 mt-5">
            <CategoryCard img={forMore} categoryType="للمزيد اضغط هنا" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
