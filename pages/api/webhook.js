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
        if( action === 'payment.created' ) {
            
            mercadopago.payment.capture(data.id, mercadopago, (error, response) => {
                if (error){
                    console.log(error);
                }else{
                    const { card, id, additional_info } = response.body;
                    const db = app.firestore()
                    db.collection('orders').doc(`${id}`).set({
                        name: card.cardholder.name,
                        title: additional_info.items[0].title,
                        amount: additional_info.items[0].unit_price,
                        image: additional_info.items[0].picture_url,
                        paymentId: id
                    })
                    console.log( additional_info.items[0].unit_price)
                }
            });    

            // console.log(req.body)
            res.status(200).json({ message: 'Payment Webhook Rcieved' })
        }
        if( action === 'test.created' ) {
            res.status(200).json({ message: 'Payment Webhook test Rcieved' })
        }
    }
}

