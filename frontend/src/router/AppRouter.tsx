import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ProductsPage } from '../features/products/pages/ProductsPage'
import { useAuth } from '../features/auth/hooks/useAuth'

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={(!isAuthenticated) ? <LoginPage /> : <Navigate to="/products" />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>

  )
}
