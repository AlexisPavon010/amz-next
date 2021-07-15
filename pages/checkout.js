import Image from "next/image"
import { useSelector } from "react-redux"
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/basketReducer"
import CheckoutProducItem from '../components/CheckoutProducItem'
import Currency from "react-currency-format"
import { useSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { useRouter } from 'next/router'

const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = () => {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session] = useSession()
    const router = useRouter()

    const createCheckAoutSession =  async () => {
        const stripe = await stripePromise;

        const checkoutSession = await axios.post('/api/create-checkout-session',{
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
    const mercadoPayment =  async () => {

        const checkoutPago = await axios.post('/api/mercadopago',{
            products: items,
            user: session?.user
        })

        const {init_point, payer, preference} = checkoutPago.data
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
                            {items.length === 0 ? 'Your basket is empty.' : 'Your Shoppin Basket'}
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
                            />
                        ))}
                    </div>
                </div>
                <div>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items):
                                <span className='font-bold'>
                                    <Currency quantity={total} urrency='GBP' />
                                </span>
                            </h2>
                            <button
                                onClick={createCheckAoutSession} 
                                role='link' 
                                className={`button ${!session && 'from-gray-300'}`}>
                                { !session ? 'Sigin' : 'Proced to Checkout'}
                            </button>
                            <button
                                onClick={mercadoPayment} 
                                role='link' 
                                className={`button ${!session && 'from-gray-300'}`}>
                                { !session ? 'Sigin' : 'Mercado Pago'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout;