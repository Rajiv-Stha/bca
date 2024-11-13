'use client'

import { useState, useContext } from 'react'
import { Search, Upload, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThriftContext } from "../../context/Context"
import styles from "./navbar.module.css"
import { CiSearch } from "react-icons/ci"
import SignOutPopover from "../popover/signout popover/SignOutPopover"
import SearchModal from "../../layouts/modal/SeachModal/SearchModal"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state: { user } } = useContext(ThriftContext)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdEEO-mCKk-1ZV-y9xarZawuakiH4VY381g&s"
                  alt="Second Hand Store Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-gray-900 font-semibold text-lg">Second Hand Store</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  About Us
                </Link>
                {user? (
                  <>
                  <Link to="/transactions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Transactions
                </Link>
                  </>
                ): ""}
                
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Search Modal */}
              <SearchModal full={true}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                </div>
              </SearchModal>

              {user ? (
                <>
                  <Link to={"/upload"}>
                    <button
                      type="button"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <Upload className="h-5 w-5 mr-2" aria-hidden="true" />
                      Upload
                    </button>
                  </Link>
                  <SignOutPopover>
                    <div className="ml-4 relative">
                      <img className="h-8 w-12 rounded-full object-cover" src={user.image} alt="User Avatar" />
                    </div>
                  </SignOutPopover>
                </>
              ) : (
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-emerald-600 text-sm font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              About Us
            </Link>
            {
              user?(
                <>  <Link to="/transactions" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
                Transactions
              </Link>
                </>
              ):""
            }
          
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              {/* Mobile Search */}
              <SearchModal full={true}>
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                </div>
              </SearchModal>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {user ? (
                <>
                  <Link to={"/upload"}>
                    <button
                      type="button"
                      className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <Upload className="inline-block h-5 w-5 mr-2" aria-hidden="true" />
                      Upload
                    </button>
                  </Link>
                  <SignOutPopover>
                    <div className="flex items-center px-5">
                      <img className="h-8 w-8 rounded-full object-cover" src={user.image} alt="User Avatar" />
                    </div>
                  </SignOutPopover>
                </>
              ) : (
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-emerald-600 bg-white border border-emerald-600 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
