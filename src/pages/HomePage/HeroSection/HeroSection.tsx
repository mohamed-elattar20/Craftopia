import { Link } from "react-router-dom";
import heroSeller from "../../../assets/images/Hero Section/hero-seller.png";
import heroBuyer from "../../../assets/images/Hero Section/hero6.jpg";
import "./hero-section.css";
//  React
import { useContext, useEffect, useState } from "react";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollRef } from "../../../firebase/firebase";
import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserContext } from "../../../Contexts/UserContext";
import {
  ButtonToolbar,
  OverlayTrigger,
  Button,
  Popover,
} from "react-bootstrap";

export const HeroSection = () => {
  const { currentUser, myUser } = useContext(UserContext);

  const popoverClickRootClose = (
    <Popover
      id="popover-trigger-click-root-close"
      title="Popover bottom"
      className="p-2 text-center"
    >
      قم بتسجيل الخروج حتى تتمكن من إنشاء حساب كبائع
    </Popover>
  );

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item position-relative active">
          <img src={heroBuyer} className="d-block w-100" alt="..." />
          <div className="hero-conent text-center">
            <h2 className="text-white mb-4">
              منصة فريدة للحرفيين الموهوبين وعشاق الفن
            </h2>
            <div className="text-center">
              <Link
                to={`/store`}
                className="hero-btn btn btn-secondary px-5 py-2 fs-5 "
              >
                ابدأ التسوق
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-item position-relative">
          <img src={heroSeller} className="d-block w-100" alt="..." />
          <div className="hero-conent text-center">
            <h2 className="text-white mb-4 ">
              انضموا إلينا وشاركوا في عرض مواهبكم
            </h2>
            <div>
              {currentUser && currentUser.Rule === "buyer" ? (
                <ButtonToolbar className="justify-content-center">
                  <OverlayTrigger
                    trigger="click"
                    rootClose
                    placement="bottom"
                    overlay={popoverClickRootClose}
                  >
                    <Button className="hero-btn btn btn-secondary  px-5 py-2 fs-5">
                      انضموا الآن
                    </Button>
                  </OverlayTrigger>
                </ButtonToolbar>
              ) : (
                <Link
                  to={`/register`}
                  className="hero-btn btn btn-secondary  px-5 py-2 fs-5"
                >
                  انضموا الآن
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
