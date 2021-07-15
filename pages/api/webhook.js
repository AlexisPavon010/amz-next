import { buffer } from "micro"
import * as admin from 'firebase-admin'

const serviceAccount = require('../../amz-nextjs-firebase-adminsdk.json')
const app = !admin.apps.length ? admin.initilaizeApp({
    credential: admin.credential.cert(serviceAccount)
})
    : admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];
    }
}

