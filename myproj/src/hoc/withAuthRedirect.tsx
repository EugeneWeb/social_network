
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"



export function WithAuthRedirect <P extends {[propName: string]: any}>(Component: React.ComponentType<P>) {
    
    const WithAuthRedirectWrapper: React.FC<P> = (props) => {
        const isAuth = useAppSelector(state => state.auth.isAuth)
        if(!isAuth) { return <Navigate to='/login' />}
        return <Component {...props} />
    }

    return WithAuthRedirectWrapper
}


