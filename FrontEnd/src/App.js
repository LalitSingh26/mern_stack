import './App.css';
import Nav from './components/nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/signUp';
import PrivateComponent from './components/privateComponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductsList';
import UpdateProduct from './components/UpdateProduct';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element = {<PrivateComponent />}>
          <Route path='/' element={<ProductList/>} />
          <Route path = '/add' element ={<AddProduct/>} />
          <Route path = '/update/:id' element ={<UpdateProduct />} />
          <Route path = '/logout' element={<h1>Logout component</h1>} />
          <Route path ='/profile' element={<h1>Profile component</h1>}/>
          </Route>
          
          <Route path ='/signup' element={<SignUp />} />
          <Route path ='/login' element={<Login />} />  
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
