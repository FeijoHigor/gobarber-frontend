import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./ToastContext";


const AppProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    );
}

export default AppProvider;