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
                        src='https://links.papareact.com/f90'
                        width={150}
                        height={40}
                        objectFit='contain'
                        className='cursor-pointer'
                    />    
                </div>
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500'>
                    <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none' type="text" />
                    <SearchIcon className='h-12 p-4' />
                </div>
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div className='link' onClick={!session ? signIn : signOut }> 
                        <p>{ session ? `Hello! ${session.user.name}` : 'Sign In'}</p>
                        <p className='font-extrabold md:text-sm'>Account & less</p>
                    </div>
                    <div className='link'>
                        <p>hellow</p>
                        <p className='font-extrabold md:text-sm'>Account & less</p>
                    </div>
                    <div className='relative link flex' onClick={()=>{router.push('/checkout')}}>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>{items.length}</span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-ligth  text-white text-sm'>
                <p className='link flex items-center'>
                    <MenuIcon  className='h-6 mr-1'/>
                </p>
                <p className='link'>all videos</p>
                <p className='link'>all videos</p>
                <p className='link'>all videos</p>
                <p className='link'>all videos</p>
                <p className='link hidden lg:inline-flex'>all videos</p>
                <p className='link hidden lg:inline-flex'>all videos</p>
                <p className='link hidden lg:inline-flex'>all videos</p>
                <p className='link hidden lg:inline-flex'>all videos</p>
            </div>
        </header>
    )
}
