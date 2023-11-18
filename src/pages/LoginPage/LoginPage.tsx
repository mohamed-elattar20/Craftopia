import { useContext, useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { UserContext } from "../../Contexts/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { ProductType } from "../../Types/ProductType";

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
