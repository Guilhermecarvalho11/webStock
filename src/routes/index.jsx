import { BrowserRouter } from "react-router-dom";
import { USER_ROLE } from "../utils/roles";
import { useAuth } from "../hooks/auth";
// import signOut from "../hooks/auth";

import { AdminRoutes } from "./admin.routes";
import { CustomerRoutes } from "./customer.routes";
import { SaleRoutes } from "./sale.routes";
import { AuthRoutes } from "./auth.routes";
import { useEffect } from "react";
import { api } from "../services/api";

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get("/users/validated").catch((error) => {
      if (error.response?.status === 401) {
        signOut();
      }
      signOut();
    });
  }, []);

  function AccessRoute() {
    switch (user.role) {
      case USER_ROLE.ADMIN:
        return <AdminRoutes />;
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />;
      case USER_ROLE.SALE:
        return <SaleRoutes />;
      default:
        return <CustomerRoutes />;
    }
  }

  return (
    <BrowserRouter>{user ? <AccessRoute /> : <AuthRoutes />}</BrowserRouter>
  );
}
