import React, { useEffect, useState } from 'react'
import Cards from "../../components/Cards";
import { requestMethods } from '../../core/enums/requestMethods';
import { sendRequest } from '../../core/config/request';
import './style.css';
import SearchBar from '../../components/SearchBar';


function Home() {

    const [recipes, setRecipes]= useState([])

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/user/recipes/display",
                method: requestMethods.GET,
            });
            console.log(response.recipes)
            const updatedRecipes = response.recipes.map((recipe) => ({
                ...recipe,
                shoppingList: recipe.shopping_lists.length > 0, 
            }));
    
            setRecipes(updatedRecipes);
            // setRecipes(response.recipes)
        } catch (error) {
            console.error('failed:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='home-page-container'>
            <SearchBar/>
            <Cards recipes={recipes} setRecipes={setRecipes}/>
        </div>
    )
}

export default Home