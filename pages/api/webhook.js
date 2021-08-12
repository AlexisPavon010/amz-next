import { buffer } from "micro"
import * as admin from 'firebase-admin'
import axios from "axios";


// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

const serviceAccount = require('../../amz-nextjs-firebase-adminsdk.json')

const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
    : admin.app();



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
    // if (req.method === 'POST') {
    //     const requestBuffer = await buffer(req);
    //     const payload = requestBuffer.toString();
    //     const sig = req.headers['stripe-signature'];
    // }

    //WEBHOOKS MERCADOPAGO



    if (req.method === 'POST') {
        const { action, data } = req.body;
        if (action === 'payment.created') {

            mercadopago.payment.capture(data.id, mercadopago, (error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    const { order, metadata } = response.body;
                    const db = app.firestore();
                    mercadopago.merchant_orders.get(order.id).then(mercadopagoResponse => {
                        const { items, total_amount } = mercadopagoResponse.body
                        // console.log(mercadopagoResponse.body)
                        //borrar los datos del carrito de compra
                        

                        // db.collection('user').doc(metadata.email).collection('basket').get().then(doc => {
                        //     const res = doc.docs
                        //     const docID = res.map(doc => doc.id)
                        //     docID.map(id => {
                        //         db.collection('user').doc(metadata.email).collection('basket').doc(id).delete()
                        //     } )
                        // })
                        // mapear y guardar los datos de compra en firebase
                        items.map(item => {
                            // console.log(item)
                            db.collection('user').doc(metadata.email).collection('ordenes').doc().set({
                                    title: item.title,
                                    amount: total_amount,
                                    image: item.picture_url,
                                    orderId: order.id,
                                    description: item.description,
                                    unit_price: item.unit_price
                                })
                        })

                    })
                }
            })

            // console.log(req.body)
            res.status(200).json({ message: 'Payment Webhook Rcieved' })
        }
        if (action === 'test.created') {
            res.status(200).json({ message: 'Payment Webhook test Rcieved' })
        }
    }
}

