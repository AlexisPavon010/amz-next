import Header from "../../components/Header"

export default function ProductSpecific() {
    return (
        <>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
            <div className='relative border rounded-md'>
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-xs text-gray-600">
                <div>
                    <p className='font-bold text-xs'>ORDENES</p>
                    <p>asdsada</p>
                </div>
                <div>
                    <p className='text-xs font-bold' >Precio</p>
                    <p>$sadasd</p>
                </div>
                <p className='absolute whitespace-nowrap top-2 right-2 w-40 lg:w-72 truncate'>asdasd</p>
                <p className='text-sm whitespace-nowrap sm:text-xl   self-end flex-1 text-right text-blue-500'>Items </p>
            </div>
            <div className='p-5 sm:p-10'>
                <div className=''>
                    {/* <Image src={image} height={200} width={150} /> */}
                </div>

            </div>
        </div>
        </main>
        </>
    )
}
