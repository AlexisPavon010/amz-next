import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import { chageState, selectItems, selectTotal } from "../slices/basketReducer"
import CheckoutProducItem from '../components/CheckoutProducItem'
import Currency from "react-currency-format"
import { getSession, useSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { db } from "../firebase"

const stripePromise = loadStripe(process.env.stripe_public_key)

const Checkout = ({Items}) => {


    // const [items, setState] = useState([])
    const [session] = useSession()
    const dispatch = useDispatch()


    useEffect(() => {
        const addItemToBasket = () => {
          Items.map(i => {
            const product = {
              ...i
            };
            // console.log(product)
            dispatch(chageState(product))
          })
        }
        console.log(Items.length)
        // if(Items.length > 0) {
        //     console.log('no hay nada')
        //     return
        //   }
     
        addItemToBasket()
       
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
                        {items?.map((item, i) => (
                            // console.log(items),
                            <CheckoutProducItem
                                key={i}
                                item={item}
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

export async function getServerSideProps(context) {

    const session = await getSession(context)
    // console.log(session)

    const getbasketitems = await db.collection('user').doc(session?.user?.email).collection('basket').get()
    const res = getbasketitems.docs
    const items = res.map(doc => doc.data())
    // console.log(items)

    return {
        props: {
            Items: items

        }
    }

}