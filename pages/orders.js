import { getSession, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Order from '../components/Order'
import { db } from '../firebase'


export default function Orders({orders}) {
    console.log(orders)
    const [session] = useSession()


    return (
        <div className='h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl mb-2 border-b border-green-400'>Tus Ordenes</h1>

                {session ? 
                    <h2>
                        {orders?.length}

                    </h2>
                : <p>Inicia Sesion para ver tus Ordenes</p>}

                {orders?.map(({title, image, orderId, unit_price}, i) => (
                    <Order 
                    key={i}
                    title={title}
                    image={image}
                    orderId={orderId}
                    unit_price={unit_price}
                    />
                ) 
                )}
            </main>

        </div>
    )
}

export async function getServerSideProps (context) {

    const session = await getSession(context) 
    console.log(session?.user?.email)

    if(!session){
        return {
            props: {},
        };
    }

    const Orders = await db.collection('user').doc(session?.user?.email).collection('ordenes').get()
        const res = Orders.docs
        const docDta = res.map(doc => doc.data())
        // console.log(docDta)
        
        return {
            props: {
                orders: docDta
            }
        
    }

}