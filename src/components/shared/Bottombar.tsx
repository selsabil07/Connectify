import { bottombarLinks } from '@/constants'
// import { INavLink } from '@/types'
// import React from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'

const Bottombar = () => {
  const location = useLocation()
  return (

    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {

const isActive = location.pathname === link.route;
          return (
                  <Link
                      to={link.route} 
                      key= {link.label} 
                      className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}>
                    <img 
                    src={link.imgURL }
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`} />

                    <p className=' tiny-medium text-light-2'>{link.label} </p>
                    
                  </Link>
               
          )
        })}
    </section >
  )
}

export default Bottombar