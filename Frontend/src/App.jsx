import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Nav1 from './components/Nav1'
import Nav2 from './components/Nav2'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import { Routes, Route, Link } from 'react-router-dom';
import Category from './pages/Category'
import About from './pages/About'
import Contact from './pages/Contact'
import ShopNow from './pages/ShopNow'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import { ToastContainer } from 'react-toastify'
import Checkout from './pages/Checkout'
import PrivateRouter from './components/PrivateRouter'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
function App() {
  const [sidebar,setSidebar]=useState(false)
  const [count, setCount] = useState('')
  let [pro,setPro]=useState([])
  let [status,setStatus]=useState('loading')
  
  useEffect(()=>{
    let fetchdata=async ()=>{
      let res=await axios.get('http://127.0.0.1:8000/api/products/')
      setPro(res.data)
      setStatus('')
    }
    fetchdata()
  },[])
  return (
    <>
    <ToastContainer/>
      <div className='min-h-screen bg-neutral-900 w-full overflow-hidden'>
        <Sidebar active={sidebar} setActive={setSidebar}/>
        <Nav1 active={sidebar} setActive={setSidebar}/>
        <Nav2/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='category/' element={<Category/>}/>
          <Route path='about/' element={<About/>}/>
          <Route path='contact/' element={<Contact/>}/>
          <Route path='shopnow/' element={<ShopNow/>}/>
          <Route path='products/:id' element={<ProductDetails/>}/>
          <Route path='cart/' element={<CartPage/>}/>
          
          <Route element={<PrivateRouter/>}>
          <Route path='checkout/' element={<Checkout/>}/>
            
          </Route>
          <Route path='login/' element={<Login/>}/>
          <Route path='signup/' element={<SignUp/>}/>
        </Routes>
      </div>
        
    </>
  )
}
export default App
