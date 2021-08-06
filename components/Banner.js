import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from 'next/image'


export default function Banner() {
    return (
        <div className='relative'>
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-900 to-transparent bottom-0 z-20' />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}

            >
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy' src="https://links.papareact.com/gi1" alt="" />
                </div>
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy' src="https://links.papareact.com/6ff" alt="" />
                </div>
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy' src="https://links.papareact.com/7ma" alt="" />
                </div>
            </Carousel>
        </div>
    )
}
