import { CollectionReference, DocumentData } from "firebase/firestore";
import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const API =
  "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRd05UY3lMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuQ1BPQ1VYMDlBTTRBcjgwNmZkdUZRcXpvWGV4SDJnNkYtc0FNT1VHVmtFaWhWNmc5T2UwZFc1TGxIc3JoZl96aVVwTmd5WlFlbll5TElzd0w1eDdXRUE=";

export const submitOrder = async (
  authUser: DocumentData[],
  ordersRef: CollectionReference<DocumentData, DocumentData>,
  total: number,
  shippingPrice: number
) => {
  if (authUser) {
    await addDoc(ordersRef, {
      clientId: authUser[0]["uId"],
      clientName: authUser[0]["displayName"],
      governorate: authUser[0]["governorate"],
      orderAt: Timestamp.fromDate(new Date()),
      price: total,
      products: authUser[0]["cart"],
      shippingPrice: shippingPrice,
      totalPrice: total + shippingPrice,
      address: authUser[0]["address"],
      status: "pending",
    }).then();
  }
};

/** PayMob */
export const authReq = async () => {
  let data = {
    api_key: API,
  };
  const req = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let response = await req.json();
  return response.token;
};

export const orderReg = async (authUser: DocumentData[], token: string) => {
  let total = 0;
  let transformedArray;
  const shippingPrice = 60;
  if (authUser) {
    const cartKeys = Object.keys(authUser[0]?.cart);
    cartKeys.forEach((key, index) => {
      total +=
        authUser[0]?.cart[key].productPrice * authUser[0]?.cart[key].quantity;
    });
    const cartArray = Object.values(authUser[0]?.cart);

    transformedArray = cartArray.map((item: any) => ({
      name: item.productTitle,
      amount_cents: parseFloat(item.productPrice) * 100, // Ensure productPrice is treated as a number
      description: item.productDescription,
      quantity: item.quantity,
    }));
  }
  let data = {
    auth_token: token,
    delivery_needed: "true",
    amount_cents: total * 100,
    currency: "EGP",
    merchant_order_id: Math.floor(new Date().getMilliseconds() * Math.random()),
    items: transformedArray,
    shipping_data: {
      apartment: "803",
      email: authUser[0].email,
      floor: "42",
      first_name: authUser[0].firstName,
      street: authUser[0].address,
      building: "8028",
      phone_number: authUser[0].phone,
      postal_code: "01898",
      extra_description: "N/A",
      city: authUser[0]["governorate"].value,
      country: "Egypt",
      last_name: authUser[0].lastName,
      state: authUser[0]["governorate"].value,
    },
    shipping_details: {
      notes: " test",
      number_of_packages: 1,
      weight: 1,
      weight_unit: "Kilogram",
      length: 1,
      width: 1,
      height: 1,
      contents: "products of some sort",
    },
  };

  let req = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let response = await req.json();
  return response;
};

export const paymentReq = async (authUser: any, token: any, id: any) => {
  let total = 0;
  let transformedArray;
  const shippingPrice = 60;
  if (authUser) {
    const cartKeys = Object.keys(authUser[0]?.cart);
    cartKeys.forEach((key, index) => {
      total +=
        authUser[0]?.cart[key].productPrice * authUser[0]?.cart[key].quantity;
    });
    const cartArray = Object.values(authUser[0]?.cart);

    transformedArray = cartArray.map((item: any) => ({
      name: item.productTitle,
      amount_cents: parseFloat(item.productPrice) * 100, // Ensure productPrice is treated as a number
      description: item.productDescription,
      quantity: item.quantity,
    }));
  }

  let data = {
    auth_token: token,
    amount_cents: total * 100,
    expiration: 3600,
    order_id: id,
    billing_data: {
      apartment: "803",
      email: authUser[0].email,
      floor: "42",
      first_name: authUser[0].firstName,
      street: authUser[0].address,
      building: "8028",
      phone_number: authUser[0].phone,
      shipping_method: "PKG",
      postal_code: "01898",
      city: authUser[0]["governorate"].value,
      country: "Egypt",
      last_name: authUser[0].lastName,
      state: authUser[0]["governorate"].value,
    },
    currency: "EGP",
    integration_id: 4352025,
  };
  let req = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  let response = await req.json();
  return response.token;
};
