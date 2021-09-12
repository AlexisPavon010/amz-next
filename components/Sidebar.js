export default function Sidebar() {
    return (
        <div className="border-t-2 bg-gray-900 p-6 pt-0 border-gray-500 transform h-full absolute top-16 md:left-0 -left-64 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl  z-10  transition-all duration-300">
            <div className="text-yellow-500 cursor-pointer justify-end flex mb-3 items-center p-1 bg-gray-700 rounded-lg  h-10 ">
                <span className="w-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </span>
                <p className="hidden md:block">Categories</p>
            </div>
            <div className="hidden md:flex font-bold text-white mb-3">
                <span className="w-8"></span>
                <span>asdasasdsd</span>
            </div>
            <div className="hidden md:flex font-bold text-white mb-3">
                <span className="w-8"></span>
                <span>asdasasdsd</span>
            </div>
            <div className="flex font-bold text-white mb-3">
                <span className="w-8"></span>
                <span>asdasasdsd</span>
            </div>
            <div className="flex items-center font-bold text-white mb-3">
                <i className="fas fa-percent"></i>
                <span className="w-4"></span>
                <span>asdasasdsd</span>
            </div>
            <div className="flex items-center font-bold text-white mb-3">
                <i className="far fa-question-circle"></i>
                <span className="w-4"></span>
                <span>asdasasdsd</span>
            </div>
        </div>
    )
}
