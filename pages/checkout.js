import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { addToBasket, chageState, getTotalItems, getCartTotal } from "../slices/basketReducer"
import CheckoutProducItem from '../components/CheckoutProducItem'
import Currency from "react-currency-format"
import { getSession, useSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { db } from "../firebase"
import Head from 'next/head'

const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = () => {


    const [Items, setState] = useState([])
    const [session] = useSession()
    const dispatch = useDispatch()

    const items = useSelector(getTotalItems)
    const total = useSelector(getCartTotal)
    const router = useRouter()
    // console.log(items?.map(i => console.log(JSON.parse(i))))

    // console.log(total)

    const createCheckAoutSession = async () => {
        const stripe = await stripePromise;

        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: session?.user.email
        })

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
            alert(result.error.message)
        }
    }
    const mercadoPayment = async () => {

        const checkoutPago = await axios.post('/api/mercadopago', {
            products: items,
            user: session?.user
        })

        const { init_point, payer, preference } = checkoutPago.data
        router.push(init_point)
        console.log(payer, preference)

        // const result = await stripe.redirectToCheckout({
        //     sessionId: checkoutSession.data.id
        // })

        // if (result.error) {
        //     alert(result.error.message)
        // }
    }

    return (
        <div className='bg-gray-200'>
            <Head>
                <title>Comprando - Parafernalia</title>
                <meta name="description" content="E-commerce de Articulos para fumadores - Parafernalia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                <div className='flex-grow'>
                    {/* <div className=''>
                        <Image src='https://links.papareact.com/ikj'
                            width={1020}
                            height={250}
                            objectFit='contain'
                        />
                    </div> */}
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? 'Tu Carrito esta vacio, agrega un producto al carrito..' : 'Tu Carrito'}
                        </h1>
                        {
                            items?.map((item, i) => (
                                <CheckoutProducItem
                                    key={i}
                                    item={JSON.parse(item)}
                                />
                            ))}
                    </div>
                </div>
                <div>
                    {items.length > 0 && (
                        <div className='flex flex-col p-5 mb-10 space-y-5 bg-white'>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items):
                                <span className='font-bold'>
                                    TOTAL ${total}
                                    {/* <Currency quantity={total} urrency='GBP' /> */}
                                </span>
                            </h2>
                            <button
                                onClick={mercadoPayment}
                                role='link'
                                className={`button-mercadopago ${!session && 'from-gray-300'}`}>
                                {!session ? 'Iniciar' : 'Pagar con Mercado Pago'}
                            </button>
                            <button
                                onClick={createCheckAoutSession}
                                role='link'
                                className={`button ${!session && 'from-gray-300'}`}>
                                {!session ? 'Iniciar' : 'Pagar con Stripe'}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout;

