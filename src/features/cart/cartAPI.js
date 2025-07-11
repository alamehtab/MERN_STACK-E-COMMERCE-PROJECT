import axios from "axios";

export async function addToCartAPI(item){
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

export async function fetchCartItemsByUserIdAPI(userId){
    // we are using userId to show the items which is added by the user itself
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:3000/cart?user='+userId)
            const data = await response.json()
            resolve({ data })
        } catch (error) {
            reject(error)
        }
    })
}

export async function updateCartItemsAPI(update){
    // we are using userId to show the items which is added by the user itself
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:3000/cart/'+update.id,{
                method:'PATCH',
                body:JSON.stringify(update),
                headers:{'content-type':'application/json'}
            })
            const data = await response.json()
            resolve({ data })
        } catch (error) {
            reject(error)
        }
    })
}

export async function deleteCartItemsAPI(itemId){
    // we are using userId to show the items which is added by the user itself
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:3000/cart/'+itemId,{
                method:'DELETE',
                headers:{'content-type':'application/json'}
            })
            const data = await response.json()
            resolve({ data:{id:itemId} })
        } catch (error) {
            reject(error)
        }
    })
}