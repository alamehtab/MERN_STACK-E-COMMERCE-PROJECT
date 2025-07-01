import React from 'react'
import { useSelector } from 'react-redux'
import { selectUsers } from '../authSlice'
import { Navigate } from 'react-router-dom'

function Protected({ children }) {
    const user = useSelector(selectUsers)
    if (!user){
        return <Navigate to='/' replace/>
    }
    return children
}

export default Protected