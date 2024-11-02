import { Suspense, lazy, useState } from 'react'
import { Routes, Route, Outlet, Link, Navigate, useLocation } from "react-router-dom";
import lessStyles from '@/app.less'
import '@/App.css'

import { Login } from '@/pages/Login'
import { Home } from '@/pages/Home'
import { Schedule } from '@/pages/Schedule'
import { PrivateRoute } from '@/components/route/ProtectedRoute'

// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /* webpackPrefetch: true */
      '@/components/PreFetchDemo'
    )
)

// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /* webpackPreload: true */
      '@/components/PreloadDemo'
    )
)

function App() {
  const isAuthenticated = localStorage.getItem('accessToken');

  const [count, setCounts] = useState('')
  const [show, setShow] = useState(false)

  const onChange = (e: any) => {
    setCounts(e.target.value)
  }

  // console.log('memberList', memberList)

  // 点击事件中动态引入css, 设置show为true
  const handleOnClick = () => {
    // 懒加载样式文件
    import('@/App.css')
    setShow(true)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={ isAuthenticated ? <Navigate to="/home" replace /> : <Login /> }/>
        <Route path="/home" element={ <PrivateRoute> <Home /> </PrivateRoute>}/>
        <Route path="/schedule" element={ <PrivateRoute> <Schedule /> </PrivateRoute>}/>
      </Routes>
    </>
  )
}

export default App
