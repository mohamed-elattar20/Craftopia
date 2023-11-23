//  Components
import AboutUs from "./AboutUs/AboutUs";
import Explore from "../../components/Explore/Explore";
import { HeroSection } from "./HeroSection/HeroSection";
import Invest from "../../components/Invest/Invest";
import Categories from "./Categories/Categories";
import LatestOffers from "./LatestOffers/LatestOffers";
import { useEffect } from "react";
import "./home-page.css";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
