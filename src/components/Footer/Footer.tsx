import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="container mx-auto py-5 home-page-footer">
      <div className="row text-center text-md-end g-5">
        <ul className="list-unstyled fw-medium px-0 col-12 col-md-8 col-xl-4">
          <li>
            <h5 className="fw-semibold mb-4">كرافتوبيا</h5>
          </li>
          <li>
            <p>منصة الكترونية لربط أصحاب المواهب بمحبي الأعمال اليدوية</p>
          </li>
        </ul>
        <ul className="list-unstyled fw-medium px-0 col-12 col-md-4 col-xl-3">
          <li>
            <h5 className="fw-semibold mb-4">روابط مفيدة</h5>
          </li>
          <li className="hoverLinks li-class">
            <a href="">
              <p>الاسئلة الشائعة</p>
            </a>
          </li>
          <li className="hoverLinks li-class">
            <a href="">
              <p>الاحكام والشروط</p>
            </a>
          </li>
          <li className="hoverLinks li-class">
            <a href="">
              <p>سياسة الخصوصية</p>
            </a>
          </li>
          <li className="hoverLinks li-class">
            <a href="">
              <p>سياسة الاستبدال و الاسترجاع</p>
            </a>
          </li>
          <li className="hoverLinks li-class">
            <a href="">
              <p>شروط البيع</p>
            </a>
          </li>
        </ul>
        <ul className="list-unstyled fw-medium px-0 col-12 col-md-8 col-xl-3">
          <li>
            <h5 className="fw-semibold mb-4">تحتاج مساعده؟</h5>
          </li>
          <li className="hoverLinks li-class">
            <a href="">
              <p>تواصل معنا</p>
            </a>
          </li>
          <li>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> support.center@craftopia.com
            </p>
          </li>
          <li>
            <p>
              <FontAwesomeIcon icon={faPhone} /> 01009732889 20+
            </p>
          </li>
        </ul>
        <ul className="list-unstyled fw-medium px-0 col-12 col-md-4 col-xl-2">
          <li>
            <h5 className="fw-semibold mb-4">تابعونا على</h5>
          </li>
          <li className="d-flex gap-4 justify-content-center justify-content-md-start li-class">
            <a className="hover-icon" href="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} className="text-primary" />
            </a>
            <a className="hover-icon" href="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} className="text-primary" />
            </a>
            <a className="hover-icon" href="https://facebook.com">
              <FontAwesomeIcon icon={faFacebookF} className="text-primary" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
