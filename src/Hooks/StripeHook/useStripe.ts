import { CollectionReference, DocumentData } from "firebase/firestore";
import { db, ordersRef } from "../../firebase/firebase.config";
import { addDoc, collection, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useStripe } from '@stripe/react-stripe-js';


const stripe = require('stripe')("sk_test_51OCi4LJasLK18SRGzu4VlGRUB1rS5TjOXFg8Jb5AaRLvlSTb99B5SqGfffGizhEWKcW4hp9mYOiYuGH8Y2dZxu2Q00vwOXKbh9");


export const submitOrder = async (authUser: DocumentData[], ordersRef:CollectionReference<DocumentData, DocumentData>, total: number, shippingPrice: number) => {
    if (authUser) {
        await addDoc(ordersRef, {
            clientId: authUser[0]["uId"],
            clientName: authUser[0]["displayName"],
            governorate: authUser[0]["governorate"],
            orderAt: Timestamp.fromDate(new Date()),
            price: total,
            products: authUser[0]["cart"],
            // [
            //     {
            //         productID: "quantity"
            //     }
            // ],
            shippingPrice: shippingPrice,
            totalPrice: total + shippingPrice,
            address: authUser[0]["address"],
            status: "pending",
            // paymentMethod: !bankCard ? "On Delivery" : "Card Payment"
        }).then(
            async () => {
                const stripe = require('stripe')("sk_test_51OCi4LJasLK18SRGzu4VlGRUB1rS5TjOXFg8Jb5AaRLvlSTb99B5SqGfffGizhEWKcW4hp9mYOiYuGH8Y2dZxu2Q00vwOXKbh9");

                let customer = await stripe.customers.create({
                    source: "tok_visa",
                    email: authUser[0]["email"],
                    name: authUser[0]["displayName"],
                    phone: authUser[0]["phone"],
                    id: authUser[0]["uId"],

                });

                // let subscription = await stripe.subscriptions.create({
                //     customer: customer.id,
                //     items: [{ price: "craftopia_test" }]
                // });
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: total * 100,
                    currency: 'egp',
                    automatic_payment_methods: { enabled: true },
                });
            }
        );
    }
}

export const getCustomers = async () => {
    try {
        const customers = await stripe.customers.list();
        console.log('Stripe Customers:', customers.data);

        return customers.data;
    } catch (error) {
        console.error('Error retrieving Stripe Customers:', error);
        throw error;
    }
}

// // Example usage
// getStripeCustomers()
//     .then((customers) => {
//         // Do something with the list of customers
//     })
//     .catch((error) => {
//         // Handle the error
//     });


// stripe.createPaymentMethod
// const adelShlal = "cus_P0o0Wj5rEoLWXJ";

export const getCustomerById = async (customerId: string) => {
    try {
        const customer = await stripe.customers.retrieve(customerId);

        console.log('Stripe Customer:', customer);

        return customer; // Customer exists
    } catch (error) {
        console.error('Error retrieving Stripe Customers:', error);
        throw error;
    }
}

// // Example usage

// checkCustomerExistence(adelShlal)
//     .then((customer) => {
//         if (customer) {
//             console.log(customer);

//         } else {
//             console.log("shalaal falsa3");
//         }
//     })
//     .catch((error) => {
//         console.log(error);

//     });