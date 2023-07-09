
import { Navigate, Outlet } from "react-router-dom";

export interface protectedRouteProps {
  canActivete: any;
  redirect: string;
}

export function ProtectedRoute({ canActivete, redirect }: protectedRouteProps) {
  return canActivete ? <Outlet /> : <Navigate to={redirect} />;
}
