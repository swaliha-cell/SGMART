import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext()

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if (data.success) {
        toast.success(data.message)
        setUser(null)
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="flex items-center justify-between px-5 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      
      {/* Text Logo */}
      <NavLink to='/' onClick={() => setOpen(false)}>
        <h1 className="text-2xl font-bold text-primary tracking-wide">SG Mart</h1>
      </NavLink>

      <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-700">
        <NavLink to='/' className="hover:text-primary transition">Home</NavLink>
        <NavLink to='/products' className="hover:text-primary transition">All Products</NavLink>
        <NavLink to='/contact' className="hover:text-primary transition">Contact</NavLink>

        <div className="hidden lg:flex items-center border border-gray-300 px-3 py-1 rounded-full bg-white">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none placeholder-gray-500 text-sm w-40 lg:w-56"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt='search' className='w-4 h-4 opacity-60' />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={profileRef}>
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              alt="profile"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <ul className="absolute top-11 right-0 bg-white shadow-lg border border-gray-200 rounded-md w-36 text-sm z-40">
                <li
                  onClick={() => {
                    setProfileOpen(false)
                    navigate("/my-orders")
                  }}
                  className="p-2 hover:bg-primary hover:text-white text-gray-800 cursor-pointer transition rounded-t-md"
                >
                  🧾 My Orders
                </li>
                <li
                  onClick={() => {
                    setProfileOpen(false)
                    logout()
                  }}
                  className="p-2 hover:bg-red-500 hover:text-white text-gray-800 cursor-pointer transition rounded-b-md"
                >
                  🚪 Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className='flex items-center gap-6 sm:hidden'>
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt='menu' />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md flex flex-col gap-2 px-5 py-4 text-sm md:hidden z-40 animate-slide-down">
          <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-primary transition">Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-primary transition">All Products</NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)} className="hover:text-primary transition">My Orders</NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)} className="hover:text-primary transition">Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false)
                setShowUserLogin(true)
              }}
              className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false)
                logout()
              }}
              className="px-6 py-2 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar












