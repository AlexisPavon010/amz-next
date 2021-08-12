import { StarIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Header from "../../components/Header"
import Product from "../../components/Product"
import { addToBasket } from "../../slices/basketReducer"
import { motion } from "framer-motion";
const MAX_RATING = 5;
const MIN_RATING = 1;

export default function ProductSpecific({ product }) {
    const pageTransition = {
        type: "tween",
        duration: 0.2,
    };

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
    // console.log(product)
    const { image, category, title, description, price, id } = product
    const dispatch = useDispatch()

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )

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

    const [hasPrime] = useState(Math.random() < 0.5)

    return (
        <>
            <Header />
            <main className='max-w-screen-lg mx-auto p-5'>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageZoom}
                    transition={pageTransition}
                >
                    <div className='h-screen'>
                        <div className='relative flex justify-items-center flex-col m-5 bg-gray-600 text-white p-10 z-30 cursor-pointer rounded-xl'>

                            <p className='absolute top-2 right-2 text-xs italic text-green-400'>{category}</p>
                            <div className='flex'>
                                <Image src={image}
                                    width={500}
                                    height={300}
                                    objectFit='contain'
                                />
                                <div className='ml-5'>

                                    <h4 className='my-3'>{title}</h4>
                                    <div className="flex">
                                        {Array(rating).fill().map((_, i) => (
                                            <StarIcon key={i} className='h-5 text-green-400' />
                                        ))}
                                    </div>

                                    <p className='text-xs my-2'>{description}</p>

                                    <div className='mb-10'>
                                        <p>${price}</p>
                                        {/* <Currency  value={price} currency='GBP' prefix={'$'}/> */}
                                    </div>

                                    {hasPrime && (
                                        <div className='flex items-center space-x-2 -mt-5'>
                                            <Image height='12' width='12' className='w-12' src='https://links.papareact.com/fdw' />
                                            <p className='text-xs text-gray-500 '>Freee</p>
                                        </div>)}

                                    <button onClick={addItemToBasket} className='mt-auto button text-gray-900'>Añadir al carrito</button>
                                </div>


                            </div>
                        </div>

                    </div>
                </motion.div>
            </main>
        </>

    )
}

export async function getServerSideProps(context) {

    const { id } = context.params;
    // console.log(id)

    const products = await fetch(
        `${process.env.HOST}/api/product/${id}`
        // `http://localhost:3000/api/product/${id}`
        // 'http://localhost:3000/api/products'
    )
        .then(
            (res) => res.json()
        );

    return {
        props: {
            product: products
        }
    }
}