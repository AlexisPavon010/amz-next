import { StarIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header"
import { addToBasket } from "../../slices/basketReducer";

const MAX_RATING = 5;
const MIN_RATING = 1;

export default function CategorySpecific({resultado}) {
    const [session] = useSession()
    const router = useRouter()
    const dispatch = useDispatch()

    const addItemToBasket = ({ id, title, price, description, category, image }) => {
        const product = {
            session,
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
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )


    

  
    console.log(resultado)
    return (
        <>
            <Header />
            <main className='max-w-screen mx-auto p-10  bg-amazon_blue'>

                <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 '>
                    {   

                        resultado?.map( item => (
                            console.log(item),
                            <div key={item?.id}>
                                <div className='relative flex justify-items-center flex-col m-5 bg-gray-600 text-white p-10 z-30 cursor-pointer rounded-xl'>
                                    <p className='absolute top-2 right-2 text-xs italic text-green-400'>{item?.category}</p>

                                    <Image src={item?.image}
                                        width={200}
                                        height={200}
                                        objectFit='contain'
                                        onClick={() => router.push(`/product/${id}`)}
                                    />
                                    <h4 className='my-3'>{item?.title}</h4>
                                    <div className="flex">
                                        {Array(rating).fill().map((_, i) => (
                                            <StarIcon key={i} className='h-5 text-green-400' />
                                        ))}
                                    </div>

                                    <p className='text-xs my-2'>{item?.description}</p>

                                    <div className='mb-5'>
                                        <p>{item?.price}</p>
                                        {/* <Currency  value={price} currency='GBP' prefix={'$'}/> */}
                                    </div>

                                    {hasPrime && (
                                        <div className='flex items-center space-x-2 -mt-5'>
                                            <Image height='12' width='12' className='w-12' src='https://links.papareact.com/fdw' />
                                            <p className='text-xs text-gray-500 '>Freee</p>
                                        </div>)}

                                    {/* <button onClick={addItemToBasket({ id, title, price, description, category, image })} className='mt-auto button text-gray-900'>Añadir al carrito</button> */}


                                </div>
                            </div>
                        )
                        )
                    }

                    {/* <Image objectFit='contain' width='1080' height='300' className='md:col-span-full' src='https://links.papareact.com/dyz' /> */}

                    {/* <div className='md:col-span-2'>
                        {products
                            .slice(4, 5)
                            .map(({ id, title, price, description, category, image }) => (
                                <Product
                                    key={id}
                                    id={id}
                                    title={title}
                                    price={price}
                                    description={description}
                                    category={category}
                                    image={image}
                                />
                            ))}
                    </div> */}


                    {/* {products
                        .slice(4, products.length)
                        .map(({ id, title, price, description, category, image }) => (
                            <Product
                                key={id}
                                id={id}
                                title={title}
                                price={price}
                                description={description}
                                category={category}
                                image={image}
                            />
                        ))} */}

                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {

    const { category } = context.query;

    const item = await fetch(
        //     // `https://amz-next.vercel.app/api/products/${id}`
        // `http://localhost:3000/api/category/${category}`
            `http://localhost:3000/api/products`
    )
        .then(
            (res) => res.json()
        );

        const resultado = item.filter( product => product.category == category );

    // console.log(item)
    return {
        props: {
            resultado   
        }
    }
}