import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <h1></h1>
            <Outlet/>
        </div>
    );
};

export {MainLayout};