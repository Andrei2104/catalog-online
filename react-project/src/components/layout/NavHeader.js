import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavHeader = () => {
    // const [showBtn, setShowBtn] = useState(null);
    // let isShowBtn = false;

    // useEffect(() => {
    //     setShowBtn(localStorage.getItem('token'))
    //     if(showBtn != null) {
    //         isShowBtn = true;
    //     }
    // },)

    return <header className="w-100 h-20 p-0 justify-between items-center flex bg-blue-500">
        <div>
            <NavLink to='/' className='text-[2rem] text-white  hover:text-gray-300 active:text-gray-300 mx-[1.5rem]'>
                Online Catalogue
            </NavLink>
        </div>
        <nav className="text-white hover:cursor-pointer">
            <ul className="flex m-0 p-0">
                <li>
                    <Link to='/' className='text-white hover:text-gray-300 active:text-gray-300 ml-[1.5rem] text-[1.25rem]'>
                        Home
                    </Link>
                </li>
                <li className=" hover:text-gray-300 active:text-gray-300 mx-[1.5rem] text-[1.25rem]">
                    <Link to='/login' className='text-white hover:text-gray-300 active:text-gray-300 ml-[1.5rem] text-[1.25rem]'>
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default NavHeader;