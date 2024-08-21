import { Routes,Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Cats from './component/Cats';
import Dogs from './component/Dogs';
import About from './component/About';
import Contact from './component/Contact';
import ProductDetails from './component/ProductDetails';
import Cart from './component/Cart/Cart';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Chekout from './component/Cart/Chekout';
import SearchResults from './component/SearchResults';
import CartProvider from './component/Context/CartProvider';
import Admin from './pages/Admin/Admin';
import Dashboard from './component/Admin/Dashboard';
import AllUsers from './component/Admin/AllUsers';
import AddProduct from './component/Admin/AddProduct';
import EditProduct from './component/Admin/EditProduct';
import Orders from './component/Admin/Orders';
import Edit from './component/Admin/Edit';
import UserDetailsPage from './component/Admin/UserDetailsPage';
import Navbar from './component/Navbar';
import Footer from './component/Footer';


function App() {
  const location=useLocation();
  const hideNavbar=location.pathname==='Login'||location.pathname==='Sign' || location.pathname.startsWith('/Admin')
  return (
    <CartProvider>
    <div className="App">
      {!hideNavbar&&<Navbar/>}
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='Login'element={<Login />} />
      <Route path='Sign' element={<Sign />}/>
      <Route path='Cats' element={<Cats/>}/>
      <Route path='Dogs' element={<Dogs/>}/>
      <Route path='About' element={<About/>}/>
      <Route path='Contact' element={<Contact/>}/>
      <Route path='Dogs/:id' element={<ProductDetails/>}/>
      <Route path='Cats/:id' element={<ProductDetails/>}/>
      <Route path='Cart' element={<Cart />}/>
      <Route path='Chekout' element={<Chekout/>}/>
      <Route path='SearchResult' element={<SearchResults/>}/>
      

      {/* Admin */}
      <Route path='Admin/' element={<Admin/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>  
      <Route path='all-users' element={<AllUsers/>}/>
      <Route path='add-product' element={<AddProduct/>}/>
      <Route path='edit-product' element={<EditProduct/>}/>
      <Route path='orders' element={<Orders/>}/>
      <Route path='edit-product/:id' element={<Edit/>}/>
      <Route path='all-users/:id' element={<UserDetailsPage/>}/>
      

      </Route>
      
      </Routes>
      {!hideNavbar&&<Footer/>}
      <ToastContainer/>
    </div>
    </CartProvider>
  );
}

export default App;
