import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBarra from '../components/Navbar'
import MyFooter from '../components/Footer'
import axios from 'axios'
import ProductsP from '../components/Products'
const Resultados = () => {
    const { search } = useParams()
    const [searchResults, setSearchResults] = useState([])
    const [Loading, setloading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/search?searchTerm=${search}`)
            .then((response) => {
                setSearchResults(response.data.products);
                setloading(false)
            })
            .catch((error) => {
                setError(error)
                setloading(false)
            })

    }
    ), []

    if (Loading) {
        return <>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
            <NavBarra />
            <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Info alert!</span> Is Loading...
                </div>
            </div></>
    }

    return (
        <>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <NavBarra />
                <main className='flex flex-col items-center content-center justify-center'>
                    <h1 className='text-4xl lg:text-6xl bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-transparent bg-clip-text mt-20 pb-8 text-center font-bold "
			'>Obtuvimos los siguientes resultados con tu busqueda</h1>
                    <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
                        {searchResults.map((product) => (
                            <div key={product.price}>
                                <ProductsP key={product.title} image_url={product.image_url} url={product.url} title={product.title} price={product.price}></ProductsP>
                            </div>
                        ))}
                    </div>
                </main>
                <MyFooter /></div>
        </>
    )
}

export default Resultados