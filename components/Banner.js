import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from 'next/image'


export default function Banner() {
    return (
        <div className='relative'>
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-900 to-transparent bottom-0 z-30' />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={4000}

            >
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy'
                    //  src="https://links.papareact.com/gi1"
                    src="https://firebasestorage.googleapis.com/v0/b/amz-nextjs.appspot.com/o/productsImages%2F170146171_269041804954267_4819044613500266775_n.jpg?alt=media&token=a3a5febe-41b4-43f4-ae6d-5bc376244cda" 
                     alt="" />
                </div>
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy' 
                    // src="https://links.papareact.com/6ff"
                    src="https://firebasestorage.googleapis.com/v0/b/amz-nextjs.appspot.com/o/productsImages%2F170844835_1421949684815348_2456167423386893400_n.jpg?alt=media&token=7242f45a-5812-4fa1-9688-d09beeeca501"
                    alt="" />
                </div>
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy'
                    src='https://firebasestorage.googleapis.com/v0/b/amz-nextjs.appspot.com/o/productsImages%2F170122699_848087969254917_6611712061296686961_n.jpg?alt=media&token=0a5609e9-47ec-49da-a25e-5931587d9dc3'
                    // src="https://links.papareact.com/7ma" 
                    alt="" />
                </div>
            </Carousel>
        </div>
    )
}
