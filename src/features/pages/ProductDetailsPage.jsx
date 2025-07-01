import React from 'react'
import ProductDetails from '../products/components/ProductDetails'
import Navbar from '../navbar/navbar'

function ProductDetailsPage() {
    return (
        <div>
            <Navbar>
                <ProductDetails></ProductDetails>
            </Navbar>
        </div>
    )
}

export default ProductDetailsPage