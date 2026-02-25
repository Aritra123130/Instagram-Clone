import React from 'react'
import{RouterProvider} from 'react-router-dom'
// import { Routes } from './routes'
import './style.scss'
import AppRoutes from './Approutes'
import {AuthProvider} from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'
const App = () => {
  
  return (
    <div>
      <AuthProvider>
        <PostContextProvider>
        <AppRoutes/>
        </PostContextProvider>
      </AuthProvider>
    </div>
  )
}

export default App
