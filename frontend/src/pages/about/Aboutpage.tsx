// import Image from 'next/image'
// import a from 'next/a'
import { Heart, Recycle, DollarSign, ShoppingBag } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function AboutPage() {
  return (
    <div>
        <Navbar/>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  About Second Hand Store
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                  Your go-to destination for pre-loved treasures and sustainable
                  shopping.
                </p>
              </div>

              <div className="mt-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <img
                      src="https://images.pexels.com/photos/6068975/pexels-photo-6068975.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Second Hand Store interior"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <img
                      src="https://images.pexels.com/photos/24777914/pexels-photo-24777914/free-photo-of-a-room-filled-with-many-different-items.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Happy customers at Second Hand Store"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Our Features
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Heart
                            className="h-6 w-6 text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Curated Selection
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              Handpicked Quality Items
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Recycle
                            className="h-6 w-6 text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Sustainability
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              Eco-Friendly Shopping
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <DollarSign
                            className="h-6 w-6 text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Affordable Prices
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              Great Deals Every Day
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <ShoppingBag
                            className="h-6 w-6 text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Unique Finds
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              One-of-a-Kind Treasures
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Our Story
                </h2>
                <div className="mt-6 text-gray-500 space-y-6">
                  <p>
                    Second Hand Store was born out of a passion for sustainable
                    living and a love for unique, pre-loved items. Our journey
                    began in 2024 when our founder, Sekhar Thapa, realized the
                    potential of giving second-hand items a new life.
                  </p>
                  <p>
                    What started as a small corner shop has now grown into a
                    beloved community hub for thrift enthusiasts and
                    eco-conscious shoppers. We take pride in our carefully
                    curated selection of clothing, accessories, home goods, and
                    more, all at prices that make quality accessible to
                    everyone.
                  </p>
                  <p>
                    At Second Hand Store, we believe that every item has a
                    story, and we're here to help write its next chapter. Join
                    us in our mission to reduce waste, promote sustainability,
                    and discover hidden gems that bring joy to your life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

      <Footer/>
      </div>
    </div>
  );
}
