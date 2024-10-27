import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('accessToken'); // 检查用户是否已登录
    return isAuthenticated ? children : <Navigate to="/login" replace />; // 如果已登录，则重定向
};

export {
    PrivateRoute,
};
