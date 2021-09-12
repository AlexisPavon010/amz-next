import Image from "next/image"
import { StarIcon } from "@heroicons/react/outline";
import Currency from "react-currency-format";
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../slices/basketReducer'
import { useSession } from "next-auth/client";

export default function CheckoutProducItem({item}) {
    const {id} = item
    console.log(item)
    
    
    const dispatch = useDispatch()
    const [session] = useSession()


    const removeBasket = () => {
        dispatch(removeFromBasket({
            id
        }));
    }
    return (
        // <div className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5'>
        
        //     <Image src={item?.image} objectFit='contain' height={200} width={200} />
        //     <   div className='col-span-3 mx5'>
        //         <p className=''>
        //             {item?.title}
        //         </p>
        //         <div>
        //             {Array(item?.rating).fill().map((_, i) => (
        //                 <StarIcon key={i} className='h-5 text-yellow-400' />
        //             ))}
        //         </div>
        //         <p className='text-xs my-2 line-clamp-3'>
        //             {item?.description}
        //         </p>
        //         {/* <Currency value={item?.price} currency='GBP' prefix={'$'} /> */}
        //         <p>${item?.price} </p>

        //         {item?.hasPrime && (
        //             <div className="felx items-center space-x-2">
        //                 <Image layout='fill' loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
        //                 <p className='tetx-xs text-gray-500'>Freee</p>
        //             </div>
        //         )}


        //     </div>
        //     <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        //         <button onClick={removeBasket} className='mt-auto button'>Quitar este Articulo</button>
        //     </div>
        // </div>
        <div class="flex ">
                    <div class="flex-none w-48 relative">
                      <Image  objectFit='cover' layout='fill' src={item?.image} />
                    </div>
                    <form class="flex-auto p-6">
                      <div class="flex flex-wrap">
                        <h1 class="flex-auto text-xl font-semibold">
                          {item?.title}
                        </h1>
                        <div class="text-xl font-semibold text-gray-500">
                          ${item?.price}
                        </div>
                        <div class="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                          In stock
                        </div>
                      </div>
                      <div class="flex items-baseline mt-4 mb-6">
                        <div class="space-x-2 flex">
                          <label>
                            <input class="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg" name="size" type="radio" value="xs" checked></input>
                            XS
                          </label>
                          <label>
                            <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="s"></input>
                            S
                          </label>
                          <label>
                            <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="m"></input>
                            M
                          </label>
                          <label>
                            <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="l"></input>
                            L
                          </label>
                          <label>
                            <input class="w-9 h-9 flex items-center justify-center" name="size" type="radio" value="xl"></input>
                            XL
                          </label>
                        </div>
                        <div class="ml-auto text-sm text-gray-500 underline">{item?.category}</div>
                      </div>
                      <div class="flex space-x-3 mb-4 text-sm font-medium">
                        <div class="flex-auto flex space-x-3">
                          <button class="w-1/2 flex items-center justify-center rounded-md bg-black text-white" type="submit">Buy now</button>
                          <button class="w-1/2 flex items-center justify-center rounded-md border border-gray-300" type="button" onClick={removeBasket}>Remove to bag</button>
                        </div>
                        <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300" type="button" aria-label="like">
                          <svg width="20" height="20" fill="currentColor">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                        </button>
                      </div>
                      <p class="text-sm text-gray-500">
                        {item?.description}
                      </p>
                      <p class="text-sm text-gray-500">
                        Free shipping on all continental US orders.
                      </p>
                    </form>
                  </div>
    )
}
