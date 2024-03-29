import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">

        <div className="logo font-bold text-2xl ">

          <span className="text-green-500 "> &lt;</span>
          Pass
          <span className="text-green-500">AK/&gt;</span>
        </div>
        <ul>
          <li className='flex gap-4'>
            <a className="" href="https://akshayns28.github.io/portfolio/" target="_blank">&#128477;&#65039; Created by <span className='text-green-500 font-semibold hover:font-bold'>AKSHAY N S</span></a>

          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
