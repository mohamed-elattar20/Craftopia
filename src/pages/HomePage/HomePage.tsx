//  Components
import Navbar from "../../components/Navbar/Navbar";
import Categories from "./Categories/Categories";
import LatestOffers from "./LatestOffers/LatestOffers";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Categories />
      <LatestOffers />
    </>
  );
};

export default HomePage;
