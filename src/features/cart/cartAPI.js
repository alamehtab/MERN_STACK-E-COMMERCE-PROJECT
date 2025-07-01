import axios from "axios";

export function addToCartAPI(item) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:3000/cart', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: { 'content-type': 'application/json' }
            })
            const data = await response.json()
            resolve({ data })
        } catch (error) {
            reject(error)
        }
    })
}