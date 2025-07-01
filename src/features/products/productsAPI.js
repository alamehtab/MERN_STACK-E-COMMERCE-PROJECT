import axios from "axios";

export async function fetchProductsAPI() {
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/products')
        const data=response.json()
        resolve({data})
    })
}

export async function fetchProductsByFilterAPI(filter, sortOption, pagination) {
    let queryString = ''
    for (let key in filter) {
        const categoryValues = filter[key]
        console.log(categoryValues);
        if (categoryValues.length > 0) {
            const lastCategoryValues = categoryValues[categoryValues.length - 1]
            console.log(lastCategoryValues);
            queryString += `${key}=${lastCategoryValues}&`

        }
    }
    for (let key in sortOption) {
        queryString += `${key}=${sortOption[key]}&`
    }
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
    }

    console.log('http://localhost:3000/products?' + queryString);

    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/products?'+queryString)
        const data=await response.json()
        const totalItems=await response.headers.get('X-Total-Count')
        resolve({data:{products:data,totalItems:+totalItems}})
    })
}

export async function fetchCategoriesAPI() {
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/categories')
        const data=response.json()
        resolve({data})
    })
}
export async function fetchBrandsAPI() {
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/brands')
        const data=response.json()
        resolve({data})
    })
}
export async function fetchProductDetailsByIdAPI(id) {
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:3000/products/'+id)
        const data=response.json()
        resolve({data})
    })
}