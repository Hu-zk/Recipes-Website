import React, { useEffect, useState } from 'react'
import Cards from "../../components/Cards";
import { requestMethods } from '../../core/enums/requestMethods';
import { sendRequest } from '../../core/config/request';
import './style.css';


function Home() {

    const [recipes, setRecipes]= useState([])

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/user/recipes/display",
                method: requestMethods.GET,
            });
            console.log(response)
            setRecipes(response.recipes)
        } catch (error) {
            console.error('failed:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Cards recipes={recipes}/>
        </div>
    )
}

export default Home