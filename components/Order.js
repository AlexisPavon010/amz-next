import Image from "next/image";

export default function Order({title, image, description, amount, orderId, unit_price}) {
    return (
        <div className='relative border rounded-md'>
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-xs text-gray-600">
                <div>
                    <p className='font-bold text-xs'>ORDENES</p>
                    <p>{title}</p>
                </div>
                <div>
                    <p className='text-xs font-bold' >Precio</p>
                    <p>${unit_price}</p>
                </div>
                <p className='absolute whitespace-nowrap top-2 right-2 w-40 lg:w-72 truncate'>{orderId}</p>
                <p className='text-sm whitespace-nowrap sm:text-xl   self-end flex-1 text-right text-blue-500'>Items {}</p>
            </div>
            <div className='p-5 sm:p-10'>
                <div className=''>
                    <Image src={image} height={200} width={150} />
                </div>

            </div>
        </div>
    )
}
