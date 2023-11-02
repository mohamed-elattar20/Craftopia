import "./ContactUs.css";
import Form from "./Form";
import { Facebook } from "react-bootstrap-icons";
import { Whatsapp } from "react-bootstrap-icons";
import { Instagram } from "react-bootstrap-icons";
import { TelephoneFill } from "react-bootstrap-icons";
import { EnvelopeFill } from "react-bootstrap-icons";
import { GeoAltFill } from "react-bootstrap-icons";

const ContactUs = () => {
  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold">تواصل معنا</h2>
        <p>أي أسئلة أو ملاحظات؟ فقط اكتب لنا رسالة</p>
      </div>
      <div className="row g-5 px-4">
        <div className="col-12 col-md-4 contact-info text-light p-3 order-1 order-md-0 px-4">
          <h3 className="mb-4 fs-3 fw-bold">بيانات التواصل</h3>
          <div className="d-flex align-items-center mb-4">
            <TelephoneFill />
            <p className="mb-0 me-3">+1012 3456 789</p>
          </div>
          <div className="d-flex align-items-center mb-4">
            <EnvelopeFill />
            <p className="mb-0 me-3">demo@gmail.com</p>
          </div>
          <div className="d-flex align-items-center mb-5">
            <GeoAltFill />
            <p className="mb-0 me-3">132 fake street</p>
          </div>
          <div className="d-flex gap-4 align-items-center">
            <Facebook size={25} />
            <Whatsapp size={25} />
            <Instagram size={25} />
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default ContactUs;
