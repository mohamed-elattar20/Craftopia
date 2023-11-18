// const sellers = query(usersCollRef, where("Rule", "==", "seller"));

// const productsForSellers = []

// async getMarker() {
//     const snapshot = await firebase.firestore().collection('orders').get()
//     return snapshot.docs.map(doc => {
//         for (let key of doc.data()["products"].keys()) {
//             productsForSellers.push({
//                 orderId: doc.data()["id"],
//                 sellerId: doc.data()["products"][key]["sellerId"],
//                 productId: key,
//                 quantity: doc.data()["products"][key]["quantity"]
//             })
//         }
//     });
// }

// for(let seller of sellers){
//     for(let product of productsForSellers){
//         if(product["sellerId"] === seller["uId"]){
//             seller["requestedProducts"].push(product)
//         }
//     }
// }
import React from 'react'

export const SellerFuncs = () => {
  return (
    <div>SellerFuncs</div>
  )
}
