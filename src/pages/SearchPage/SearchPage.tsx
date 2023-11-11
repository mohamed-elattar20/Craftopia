import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CollectionReference,
  DocumentData,
  Query,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { productsCollRef } from "../../firebase/firebase";
import ProductCard from "../../components/ProductCard/ProductCard";
// Firebase
const SearchPage = () => {
  const [products, setProducts] = useState<any>([]);
  const { word } = useParams();
  // *****************************************
  const searchDocuments = async (keyword: any) => {
    try {
      // Create a query to search for documents where a specific field contains the keyword
      // collectionRef
      //   .where("name", ">=", queryText)
      //   .where("name", "<=", queryText + "\uf8ff");
      const q = query(
        productsCollRef,
        where("productTitle", ">=", keyword),
        where("productTitle", "<=", keyword + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => doc.data());
      console.log("Search results:", documents);
      setProducts(documents);
    } catch (error) {
      console.error("Error searching documents:", error);
    }
  };
  useEffect(() => {
    searchDocuments(word);
  }, [word]);
  //   searchDocuments("محفظة جلد");

  // *****************************************

  return (
    <>
      <div className="container">
        <div className="row my-5 g-3">
          {products.map((prod: any) => (
            <div key={prod.sellerId} className="col-6 col-md-6 col-lg-3">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
