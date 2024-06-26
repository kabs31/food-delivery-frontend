import React, { useContext, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from "./components/User/Register/RegisterForm";
import LoginForm from "./components/User/Login/LoginForm";
import UserProfile from "./components/User/UserProfile";
import UpdateProfileForm from "./components/User/UpdateProfileForm";
import { AuthContext } from "./components/Auth/AuthProvider";
import Restaurant from './components/Restaurant/Restaurant';
import FoodItemList from './components/FoodItem/FoodItemList';
import AddFoodItem from './components/FoodItem/AddFoodItem';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Auth/CartProvider';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Function to render component or redirect based on authentication status
  const renderRoute = useMemo(() => {
    return (Component, redirectTo = '/login') => {
      const token = localStorage.getItem('authToken');
      console.log('Retrieved token from localStorage:', token); // Debugging log
      
      return token ? <Component /> : <Navigate to={redirectTo} />;
    };
  }, [isAuthenticated]);

  return (
    <CartProvider>
    <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/profile" element={renderRoute(UserProfile)} />
              <Route path="/update-profile" element={renderRoute(UpdateProfileForm)} />
              <Route path="/restaurant" element={renderRoute(Restaurant)} />
              <Route path="/restaurant/:restaurantId/fooditems" element={<FoodItemList />} />
              <Route path="/admin/add-fooditem" element={<AddFoodItem />} />
          </Routes>
          <Cart /> 
        </div>
      </BrowserRouter>
      </CartProvider>
  );
};

export default App;
