import { Suspense, lazy, useState } from 'react'
import '@/App.css'
import lessStyles from '@/app.less'

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
    <div>
      <h2 className="text-4xl font-bold underline">Hello Xiloong</h2>
      <div className={lessStyles.lessBox}>
        <button className="btn w-64 rounded-full">Button</button>
      </div>
      {show && (
        <>
          <Suspense fallback={null}>
            <PreloadDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreFetchDemo />
          </Suspense>
        </>
      )}
    </div>
  )
}

export default App
