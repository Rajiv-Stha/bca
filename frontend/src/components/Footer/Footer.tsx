import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800">
<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        About Us
      </h3>
      <ul className="mt-4 space-y-4 text-base text-gray-300 hover:text-white">
        <li>
          <Link to={"/about"}>
            Our Story
          </Link>
        </li>
        <li>
          <a
            href="/team"
            className="text-base text-gray-300 hover:text-white"
          >
            Our Team
          </a>
        </li>
        <li>
          <a
            href="/careers"
            className="text-base text-gray-300 hover:text-white"
          >
            Careers
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Shop
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <Link to={"/allProducts"}
            
            className="text-base text-gray-300 hover:text-white"
          >
            All Categories
          </Link>
        </li>
        <li>
          <a
            href="/featured"
            className="text-base text-gray-300 hover:text-white"
          >
            Featured Items
          </a>
        </li>
        <li>
          <a
            href="/deals"
            className="text-base text-gray-300 hover:text-white"
          >
            Deals
          </a>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        Contact
      </h3>
      <ul className="mt-4 space-y-4">
        <li>
          <a
            href="/contact"
            className="text-base text-gray-300 hover:text-white"
          >
            Contact Us
          </a>
        </li>
        <li>
          <a
            href="mailto:thriftyfindsssss@gmail.com"
            className="text-base text-gray-300 hover:text-white"
          >
            thriftyfindsssss@gmail.com
          </a>
        </li>
        <li>
          <a
            href="tel:+1234567890"
            className="text-base text-gray-300 hover:text-white"
          >
            (123) 456-7890
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div className="mt-8 border-t border-gray-700 pt-8">
    <p className="text-base text-gray-400 xl:text-center">
      &copy; 2024 Second Hand Store. All rights reserved.
    </p>
  </div>
</div>
</footer>
  )
}

export default Footer
