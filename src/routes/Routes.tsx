/* import { Navigate, Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

type RouteProps = ReactDOMRouteProps & {
    isPrivate?: boolean
    component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, ...rest }) => {
  const { user } = useAuth();

  return (
    isPrivate && !!user ? (
        <ReactDOMRoute {...rest} />
    ) : (
        <ReactDOMRoute {...rest} element={<Navigate to={isPrivate ? '/' : '/dashboard'} />}/>
    )
  )
};

export default Route; */


import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const PrivateRoutes = () => {
    const { user } = useAuth()

    if(!!user) {
        return <Outlet />
    }else (
        <Navigate to={'/'} />
    )
}

export default PrivateRoutes