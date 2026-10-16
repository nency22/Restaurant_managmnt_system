import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import useTheme from "./hooks/useTheme";
import { prefetchMenu } from "./services/menuService";
import ServerErrorBanner from "./components/feedback/ServerErrorBanner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    prefetchMenu();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <ServerErrorBanner />
        <AppRoutes />
        <ToastContainer
          position="bottom-right"
          theme={theme}
          autoClose={3500}
          newestOnTop
          closeOnClick
          pauseOnHover
          limit={4}
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
