import Product from "./Product"
import Image from 'next/image'
import { motion } from "framer-motion"

export default function ProductFeed({ products }) {
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

    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 z-50 bg-amazon_blue'>


            {products.map(({ id, title, price, description, category, image }) => (
                <motion.div
                    key={id}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageZoom}
                    transition={pageTransition}
                >
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                </motion.div>
            )
            )}


            <Image objectFit='contain' width='1080' height='300' className='md:col-span-full' src='https://links.papareact.com/dyz' />

            <div className='md:col-span-2'>
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
            </div>


            {products
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
                ))}

        </div>
    )
}
