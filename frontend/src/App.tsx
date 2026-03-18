import { Toaster } from "sonner"
import { AuthProvider } from "./features/auth/hooks/useAuth"
import { AppRouter } from "./router/AppRouter"
import { CartProvider } from "./features/cart/components/CartProvider"

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
        <Toaster richColors />
      </CartProvider>
    </AuthProvider>
  )
}

