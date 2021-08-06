import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

const success = () => {
    const router = useRouter()

    return (
        <div className='bg-gray-100 h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 mt-5 bg-green-200'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10' />
                        <h1 className='text-3xl'> Gracias,  Su compra fue Exitosa..!</h1>
                    </div>
                    <p>
                        Muchas Gracias por tu compra, Puedes Chequear que onda tus ordenes en el botton
                    </p>
                    <button onClick={()=> router.push('/orders')} className='button mt-5'>Mis Ordenes</button>
                </div>

            </main>
        </div>
    )
}

export default success;