import React from 'react'
import Navbar from '../navbar/navbar'
import ProductList from '../products/components/ProductList'

function Home() {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
    </div>
  )
}

export default Home