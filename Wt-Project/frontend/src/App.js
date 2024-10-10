import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/home/Home';
import Navbar from './components/navbar/Navbar';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProtectedRouter from './utils/UserProtectedRouter';
import Cart from './Pages/cart/Cart';
import AdminProtectedRouter from './utils/AdminProtectedRouter';
import Dashboard from './Pages/dashboard/Dashboard';
import AddProduct from './Pages/dashboard/AddProduct';
import UpdateProduct from './Pages/dashboard/UpdateProduct';
import AdminRegister from './components/Auth/AdminRegister';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />

          {/* USER AUTH */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/adminregister' element={<AdminRegister />} />

          {/* USER PROTECTED */}
          <Route element={<UserProtectedRouter />} >
            <Route path='/cart' element={<Cart />} />
          </Route>

          {/* USER PROTECTED */}
          <Route element={<AdminProtectedRouter />} >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/updateproduct/:id' element={<UpdateProduct />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;