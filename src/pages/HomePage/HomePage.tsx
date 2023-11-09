//  Components
import AboutUs from "./AboutUs/AboutUs";
import Explore from "../../components/Explore/Explore";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import Invest from "../../components/Invest/Invest";
import Navbar from "../../components/Navbar/Navbar";
import Categories from "./Categories/Categories";
import LatestOffers from "./LatestOffers/LatestOffers";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <LatestOffers />
      <Explore />
      <Invest />
      <AboutUs />
    </>
  );
};

export default HomePage;
