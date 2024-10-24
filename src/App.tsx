import { Suspense, lazy, useState } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import lessStyles from '@/app.less'
import '@/App.css'

import { Login } from '@/pages/Login'
import { Home } from '@/pages/Home'

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
    <Routes>
      <Route path="/" element={<Login />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="dashboard" element={<Dashboard />} /> */}

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  )
}

export default App
