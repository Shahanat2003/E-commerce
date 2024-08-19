import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Navbar from './component/Navbar';
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
import Footer from './component/Footer';
import CartProvider from './component/Context/CartProvider';



function App() {
  return (
    <CartProvider>
    <div className="App">
      <Navbar/>
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
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
    </CartProvider>
  );
}

export default App;
