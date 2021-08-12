import Image from "next/image"
import { StarIcon } from "@heroicons/react/outline";
import Currency from "react-currency-format";
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../slices/basketReducer'
import { useSession } from "next-auth/client";

export default function CheckoutProducItem({item}) {
    const {id} = item
    // console.log(item)
    
    
    const dispatch = useDispatch()
    const [session] = useSession()


    const removeBasket = () => {
        dispatch(removeFromBasket({
            id
        }));
    }
    return (
        <div className='grid grid-cols-5'>
        
            <Image src={item?.image} objectFit='contain' height={200} width={200} />
            <   div className='col-span-3 mx5'>
                <p className=''>
                    {item?.title}
                </p>
                <div>
                    {Array(item?.rating).fill().map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-400' />
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-3'>
                    {item?.description}
                </p>
                {/* <Currency value={item?.price} currency='GBP' prefix={'$'} /> */}
                <p>${item?.price} </p>

                {item?.hasPrime && (
                    <div className="felx items-center space-x-2">
                        <Image layout='fill' loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
                        <p className='tetx-xs text-gray-500'>Freee</p>
                    </div>
                )}


            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button onClick={removeBasket} className='mt-auto button'>Quitar este Articulo</button>
            </div>
        </div>
    )
}
