import './App.css';
import HomePage from './layouts/HomePage/HomePage';
import 'antd/dist/antd.min.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Admin from './layouts/Admin/Admin';
import { useDispatch } from 'react-redux';
import AppContent from './components/List/Content';
import UserProduct from './components/List/UserProduct';
import CartPage from './layouts/HomePage/CartPage';
import AppLogin from './pages/Login/Login';
import AppRegister from './pages/Register/Register';
import ProductDetails from './layouts/HomePage/details/ProductDetails';
import ListProduct from './layouts/Admin/Products/ListProduct';
import AddProduct from './layouts/Admin/Products/addProducts/AddProduct';
import EditProduct from './layouts/Admin/Products/editProducts/EditProduct';
import ListUsers from './layouts/Admin/Users/ListUsers/ListUsers';
import ViewUser from './layouts/Admin/Users/ViewUser/ViewUser';
import ListOrders from './layouts/Admin/Orders/ListOrders';
import DashBoard from './layouts/Admin/DashBoard/DashBoard';
import { useEffect } from 'react';
import { INFO_USER_KEY } from './constants/constants';
import { actLogin } from './redux/actions/authAction';
import Profile from './pages/Profile/Profile';
import ViewOrders from './layouts/Admin/Orders/ViewOrders/ViewOrders';
import ListComments from './layouts/Admin/Comments/ListComments/ListComments';


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem(INFO_USER_KEY))
    dispatch(actLogin({
      email: profile?.email,
      password: profile?.password,
      navigate: navigate
    }))
  }, [])

  return (
    <div className="app">
      <Routes>
        {/* admin  */}
        <Route path='/admin' element={<Admin />}>
          <Route path='products' element={<ListProduct />} />
          <Route path='products/add' element={<AddProduct />} />
          <Route path='products/edit/:id' element={<EditProduct />} />
          <Route path='users' element={<ListUsers />} />
          <Route path='users/view/:id' element={<ViewUser />} />
          <Route path='orders/view/:id' element={<ViewOrders />} />
          <Route path='orders' element={<ListOrders />} />
          <Route path='comments' element={<ListComments />} />
          <Route path='dashboard' element={<DashBoard />} />
          <Route path='' element={<Navigate to="/admin/dashboard" replace={true} />} />
        </Route>

        {/* user */}
        <Route path='' element={<HomePage />}>
          <Route path='' element={<AppContent />} />
          <Route path='/product' element={<UserProduct />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<AppLogin />} />
          <Route path='/register' element={<AppRegister />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='product/details/:id' element={<ProductDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

