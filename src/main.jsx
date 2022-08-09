import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import Route  from './route';
// 引入antd样式
import 'antd/dist/antd.css';
//全局css样式
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Route></Route> */}
  </React.StrictMode>
)
