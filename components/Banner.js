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
                    src="https://instagram.fcnq2-2.fna.fbcdn.net/v/t51.2885-15/e35/170844835_1421949684815348_2456167423386893400_n.jpg?_nc_ht=instagram.fcnq2-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=7NpL3t9E1y8AX8ZFGb3&edm=AABBvjUBAAAA&ccb=7-4&oh=ae3ce11ae2d20085c8a444eccef248e6&oe=6113B570&_nc_sid=83d603" 
                     alt="" />
                </div>
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy' 
                    // src="https://links.papareact.com/6ff"
                    src="https://instagram.fcnq2-1.fna.fbcdn.net/v/t51.2885-15/e35/170146171_269041804954267_4819044613500266775_n.jpg?_nc_ht=instagram.fcnq2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=TbgFS61U0nwAX_d6_9t&edm=AP_V10EBAAAA&ccb=7-4&oh=3d3241b1041bf06cd329a06fba6672ad&oe=6114C4C8&_nc_sid=4f375e"
                    alt="" />
                </div>
                <div>
                    <Image objectFit='cover' width='1920' height='920' loading='lazy'
                    src='https://instagram.fcnq2-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/170122699_848087969254917_6611712061296686961_n.jpg?_nc_ht=instagram.fcnq2-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=7AodMkW5OckAX-pYDtC&edm=AP_V10EBAAAA&ccb=7-4&oh=10e07300dcde390c944b7a298918548d&oe=61146799&_nc_sid=4f375e'
                    // src="https://links.papareact.com/7ma" 
                    alt="" />
                </div>
            </Carousel>
        </div>
    )
}
