import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'
import { useDispatch } from 'react-redux'
import { chageState, addToBasket, selectItems, selectTotal, restoreCart } from "../slices/basketReducer"
import { db } from '../firebase'
import { getSession, session, useSession } from 'next-auth/client'



export default function Home({ products }) {

  const dispatch = useDispatch()
  const [session] = useSession()


  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    console.log(localCart)

    if (localCart) {

      dispatch(
        restoreCart(
          { cart: JSON.parse(localCart) },

        )
      );
    }


  }, [])


  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Parafernalia - NextJs</title>
        <meta name="description" content="E-commerce de Articulos para fumadores Montecarlo - Misiones - Parafernalia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {

  const session = await getSession(context)

  // const getbasketitems = await db.collection('user').doc(session?.user?.email).collection('basket').get()
  // const res = getbasketitems.docs
  // const items = res.map(doc => doc.data())

  const products = await fetch(
    'https://amz-next.vercel.app/api/products'
    // 'http://localhost:3000/api/products'
  )
    .then(
      (res) => res.json()
    );

  return {
    props: {
      // basketItems: items,
      products,
      session
    }
  }
}