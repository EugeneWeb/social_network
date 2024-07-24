import { NavigateFunction, Params, useLocation, useNavigate, useParams } from "react-router-dom";

export type WithRouterProps = {
    params: Readonly<Params<string>>;
    navigate: NavigateFunction;
    location: Location;
}

export function WithRouter<P extends {[propName: string]: any}>(Component: React.ComponentType<P>) {
    const WithRouterContainer: React.FC<P> = (props) => {
        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation();

        return (
            <Component
                {...props}
                params={params}
                navigate={navigate}
                location={location}
            />
        );
    };

    return WithRouterContainer;
};

