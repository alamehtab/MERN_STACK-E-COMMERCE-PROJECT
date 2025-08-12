export const createUserAPI = (userData) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' }
        })
        const data = await response.json()
        resolve({ data })
    })
}
export const checkUserAPI = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        const email = userInfo.email
        const password = userInfo.password
        const response = await fetch('http://localhost:3000/users?email=' + email)
        const data=await response.json()
        console.log({data});
        if(data.length){
            if(password===data[0].password){
                resolve({data:data[0]})
            }else{
                reject({message:'Wrong credentials!'})
            }
        }else{
            reject({message:'User Not Found!'})
        }
    })

}

export const updateUserAPI = (update) => {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:3000/users/'+update.id, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: { 'content-type': 'application/json' }
        })
        const data = await response.json()
        resolve({ data })
    })
}