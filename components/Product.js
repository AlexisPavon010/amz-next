import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/outline";
import Currency from 'react-currency-format';
import { useDispatch } from 'react-redux'
import { addToBasket } from "../slices/basketReducer";
import { useSession } from "next-auth/client";
import { db } from "../firebase";
import { useRouter } from "next/router";

const MAX_RATING = 5;
const MIN_RATING = 1;


export default function Product({ id, title, price, description, category, image }) {

    const pageZoom = {
        initial: {
          opacity: 0,
          scale: 0.95,
        },
        in: {
          opacity: 1,
          scale: 1,
        },
        out: {
          opacity: 0,
          scale: 0.95,
        },
      };

    const [session] = useSession()
    const router = useRouter()
    const dispatch = useDispatch()

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )

    const [hasPrime] = useState(Math.random() < 0.5)

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
        };

        dispatch(addToBasket(product))
    }
    return (
        <div className='relative flex justify-items-center flex-col m-5 bg-gray-600 text-white p-10 z-30 cursor-pointer rounded-xl'>
            <p className='absolute top-2 right-2 text-xs italic text-green-400'>{category}</p>
            
                <Image src={image}
                    width={200}
                    height={200}
                    objectFit='contain'
                    onClick={()=> router.push(`/product/${id}`)}
                />
                <h4 className='my-3'>{title}</h4>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className='h-5 text-green-400' />
                    ))}
                </div>

                <p className='text-xs my-2'>{description}</p>

                <div className='mb-5'>
                    <p>{price}</p>
                    {/* <Currency  value={price} currency='GBP' prefix={'$'}/> */}
                </div>

                {hasPrime && (
                    <div className='flex items-center space-x-2 -mt-5'>
                        <Image height='12' width='12' className='w-12' src='https://links.papareact.com/fdw' />
                        <p className='text-xs text-gray-500 '>Freee</p>
                    </div>)}

            <button onClick={addItemToBasket} className='mt-auto button text-gray-900'>Añadir al carrito</button>


        </div>
    )
}
