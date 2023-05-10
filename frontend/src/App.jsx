import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Category from './pages/Category';
import Sale from './pages/Sale';
import AddProduct from './components/products/AddProduct';
import ListProduct from './components/products/ListProduct';
import ProductUnit from './components/products/ProductUnit';
import AddCustomer from './components/customers/AddCustomer';
import ListCustomer from './components/customers/ListCustomer';
import ProductBrands from './components/products/ProductBrands';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import PrivateRoutes from './utls/PrivateRoutes';
import PublicRoute from './utls/PublicRoute';
import ResetPassword from './components/login/ResetPassword';
import NewPassword from './pages/NewPassword';
import { AuthProvider } from './utls/auth';
import RequireAuth from './utls/RequireAuth';
import AddUser from './pages/users/AddUser';
import ListUsers from './pages/users/ListUsers';
import { useMemo } from 'react';
import EditeProduct from './components/products/EditeProduct';
import { ToastContainer } from 'react-toastify';
import ProductReport from './pages/reports/ProductReport';
import ListSale from './pages/ListSale';
import SaleReports from './pages/reports/SaleReports';
import AddSupplier from './components/supplier/AddSupplier';
import ListSupplier from './components/supplier/ListSupplier';
import StockReports from './pages/reports/StockReports';
function App() {
  return (
    <AuthProvider>
      <div className="flex">
        {useMemo(() => {
          return <Sidebar />;
        }, [])}

        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/productunit" element={<ProductUnit />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route path="/listcustomer" element={<ListCustomer />} />
            <Route path="/product-brands" element={<ProductBrands />} />
            <Route path="/update-product/:id" element={<EditeProduct />} />
            <Route path="/list-sales" element={<ListSale />} />
            <Route path="/addsup" element={<AddSupplier />} />
            <Route path="/listsup" element={<ListSupplier />} />

            <Route element={<RequireAuth />}>
              <Route path="/sale-reports" element={<SaleReports />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/listuser" element={<ListUsers />} />
              <Route path="/productReport" element={<ProductReport />} />
              <Route path="/stockReport" element={<StockReports />} />
            </Route>
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
          <Route
            path="/forgotpassword/:id/:token"
            element={<NewPassword />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        {/* toast message */}
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
