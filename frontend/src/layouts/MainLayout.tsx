import {Outlet} from "react-router-dom";
import { Header } from "../components/pizzasContainer/Header/Header";

const MainLayout = () => {
    return (
        <div>
         <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};