import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {publicRoutes, privateRoutes} from "./index";
import {AuthContext} from "../Context/Contextes";

const Routing = () => {
    const {currentUserId} = useContext(AuthContext)

    return (
        <Routes>
            {currentUserId
                ? privateRoutes.map(
                    route =>
                        <Route
                            path={route.patch}
                            element={route.element}
                            exact={route.exact}
                            key={route.patch}
                        />
                )
                : publicRoutes.map(
                    route =>
                        <Route
                            path={route.patch}
                            element={route.element}
                            key={route.patch}
                        />
                )
            }
            {}
        </Routes>
    );
};

export default Routing;