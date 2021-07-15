import Image from "next/image"
import { StarIcon } from "@heroicons/react/outline";
import Currency from "react-currency-format";
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../slices/basketReducer'

export default function CheckoutProducItem({ id, title, price, description, rating, category, image, hasPrime }) {
    const dispatch = useDispatch()

    const removeBasket = () => {
        dispatch(removeFromBasket({
            id
        }));
    }
    return (
        <div className='grid grid-cols-5'>
            <Image src={image} height={200} width={200} />
            <   div className='col-span-3 mx5'>
                <p className=''>
                    {title}
                </p>
                <div>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className='h-5 bg-yellow-400' />
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-3'>
                    {description}
                </p>
                <Currency value={price} currency='GBP' prefix={'$'} />

                {hasPrime && (
                    <div className="felx items-center space-x-2">
                        <Image layout='fill' loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
                        <p className='tetx-xs text-gray-500'>Freee</p>
                    </div>
                )}


            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='mt-auto button'>add to basket</button>
                <button onClick={removeBasket} className='mt-auto button'>Remove From the basket</button>
            </div>
        </div>
    )
}
