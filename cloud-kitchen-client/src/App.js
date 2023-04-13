import './App.css';
import AddMenuItem from './components/AddMenuItem';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListMenu from './components/ListMenu';
import MenuItemDetails from './components/MenuItemDetails';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/menuitems' element={<ListMenu />} />
        <Route path='/addmenuitem' element={<AddMenuItem />} />
        <Route path='/menuitemdetails/:id' element={<MenuItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
