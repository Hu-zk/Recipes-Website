import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../core/enums/requestMethods';
import { sendRequest } from '../../core/config/request';
import FavCards from '../../components/FavCard';


function Favourite() {

    const [recipes, setRecipes]= useState([])

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/user/shopping-lists",
                method: requestMethods.GET,
            });
            console.log(response.recipes)
            setRecipes(response.recipes);
        } catch (error) {
            console.error('failed:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='home-page-container'>
            <FavCards recipes={recipes} setRecipes={setRecipes}/>
        </div>
    )
}

export default Favourite