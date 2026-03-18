import { AuthProvider } from "./features/auth/hooks/useAuth"
import { AppRouter } from "./router/AppRouter"

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

