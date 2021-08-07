import Image from "next/image";
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
import { selectItems } from '../slices/basketReducer'
import { useSelector } from "react-redux";

export default function Header() {
    const [session] = useSession() 
    const router = useRouter()
    const items = useSelector(selectItems)

    return (
        <header>
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        onClick={()=>{router.push('/')}}
                        src='https://images.cooltext.com/5545351.png'
                        width={150}
                        height={40}
                        objectFit='contain'
                        className='cursor-pointer'
                    />    
                </div>
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow bg-green-400 hover:bg-green-500'>
                    <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none' type="text" />
                    <SearchIcon className='h-12 p-4' />
                </div>
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div className='link' onClick={!session ? signIn : signOut }> 
                        <p>{ session ? `Hello! ${session.user.name}` : 'Iniciar'}</p>
                        <p className='font-extrabold md:text-sm'>Account & Mas</p>
                    </div>
                    <div onClick={()=>{router.push('/orders')}} className='link'>
                        <p>Ordenes</p>
                        <p className='font-extrabold md:text-sm'>Ordenes & Mas</p>
                    </div>
                    <div className='relative link flex' onClick={()=>{router.push('/checkout')}}>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-green-400 text-center rounded-full text-white font-bold'>{items.length}</span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Carrito</p>
                    </div>
                </div>
            </div>
            <div className='flex  items-center  p-2 pl-6 bg-amazon_blue-ligth  text-white text-sm'>
                <div className="flex max-w-sm justify-between space-x-4">

                {/* <p className='link flex items-center'>
                    <MenuIcon  className='h-6 mr-1'/>
                </p> */}
                
                <p className='link'>Picadores</p>
                <p className='link'>Encendedores</p>
                <p className='link'>Papelillos</p>
                <p className='link'>Pipas</p>
                <p className='link'>Tabaco</p>
                </div>
            </div>
        </header>
    )
}
