import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, userData, setUserData } = useContext(ShopContext);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isOther = !isHome;

  // Sticky scroll only for home page
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setToken('')
    setUserData({ name: '', email: '' })
    setCartItems({})
  }

  // Navbar text always black; hover gray
  const tagColor = 'text-black';
  const tagHover = 'text-gray-500';

  // Background: home uses scroll logic, others always white
  const bgClass = isHome ? (scrolled ? 'bg-black shadow-sm' : 'bg-transparent') : 'bg-white shadow-sm';

  return (
    <div className={`z-50 flex items-center justify-between pb-5 pt-[10px] font-medium ${isHome ? 'fixed top-0 left-0 w-full px-[8px] z-50' : 'relative -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-[8px]'} ${bgClass} transition-colors duration-300`}
    >
      <ul className='hidden sm:flex gap-5 text-sm'>
        <NavLink to='/' className='flex flex-col items-center gap-1 group'>
          <p className={`${tagColor} group-hover:${tagHover} transition-colors duration-300`}>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 group'>
          <p className={`${tagColor} group-hover:${tagHover} transition-colors duration-300`}>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
          <p className={`${tagColor} group-hover:${tagHover} transition-colors duration-300`}>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
          <p className={`${tagColor} group-hover:${tagHover} transition-colors duration-300`}>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-6 ml-auto'>
        <img onClick={() => { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-48 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                <div className='border-b border-gray-300 pb-2 mb-1'>
                  <p className='font-bold text-black'>{userData?.name}</p>
                  <p className='text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap'>{userData?.email}</p>
                </div>
                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          )}
        </div>
        <Link to='/cart' className='relative group/cart'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-bold'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* Sidebar menu for small screens */}
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white z-50 transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600 w-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
