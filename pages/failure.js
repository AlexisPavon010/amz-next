import Header from '../components/Header'
import { XCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

export default function Success() {
    const router = useRouter()
    return (
        <div className='bg-gray-100 h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 mt-5 bg-red-200'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <XCircleIcon className='text-red-500 h-10' />
                        <h1 className='text-3xl'> Opps,  Su compra fue Rechazada..!</h1>
                    </div>
                    <p>
                        Hemos tenido un inconveniente en tu compra... Puedes Pobar de nuevo presionando el botton
                    </p>
                    <button onClick={()=> router.push('/checkout')} className='button-danger mt-5'>Volver al Carrito</button>
                </div>

            </main>
        </div>
    )
}
