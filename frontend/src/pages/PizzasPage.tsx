import React from "react";
import { Pizzas } from "../components/pizzasContainer/Pizzas";
import { PizzaCreate } from "../components/pizzasContainer/PizzaCreate";

const PizzasPage = () => {
    return (
        <div>
            <PizzaCreate/>
            <hr/>
            <Pizzas/>
        </div>
    );
};

export default PizzasPage;