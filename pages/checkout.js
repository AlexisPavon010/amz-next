import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { chageState, selectItems, selectTotal } from "../slices/basketReducer"
import CheckoutProducItem from '../components/CheckoutProducItem'
import Currency from "react-currency-format"
import { useSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { db } from "../firebase"

const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = () => {


    // const [items, setState] = useState([])
    const [session] = useSession()
    const dispatch = useDispatch()



    useEffect(() => {
        db.collection('user').doc(session?.user.email).collection('basket').get().then(r => {
            const res = r.docs
            const items = res.map(doc => doc.data())
            console.log(items.length)
            // setState(items)
            if (items.length === 0) {
                return
            }
            
            const addItemToBasket = () => {
                items.map(i => {
                    console.log(i)
                    const product = {
                        ...i
                    };
                    console.log(product)
                    dispatch(chageState(product))
                }) 
            }
          

            addItemToBasket()
                     
          
        })
    }, [])

    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const router = useRouter()

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
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                <div className='flex-grow'>
                    <div className=''>
                        <Image src='https://links.papareact.com/ikj'
                            width={1020}
                            height={250}
                            objectFit='contain'
                        />
                    </div>
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? 'Tu Carrito esta vacio, graga un producto al carrito..' : 'Tu Carrito'}
                        </h1>
                        {items.map((item, i) => (
                            <CheckoutProducItem
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                docId={item.do}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    {items.length > 0 && (
                        <div className='flex flex-col p-5 space-y-5 bg-white'>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items):
                                <span className='font-bold'>
                                    {total}
                                    {/* <Currency quantity={total} urrency='GBP' /> */}
                                </span>
                            </h2>
                            <button
                                onClick={createCheckAoutSession}
                                role='link'
                                className={`button ${!session && 'from-gray-300'}`}>
                                {!session ? 'Iniciar' : 'Pagar con Stripe'}
                            </button>
                            <button
                                onClick={mercadoPayment}
                                role='link'
                                className={`button ${!session && 'from-gray-300'}`}>
                                {!session ? 'Iniciar' : 'Pagar con Mercado Pago'}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout;

export async function getServerSideProps(context) {



    return {
        props: {

        }
    }

}