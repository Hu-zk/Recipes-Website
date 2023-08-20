import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Cards({recipes,setRecipes}) {

    const [activeRecipeIndex, setActiveRecipeIndex] = useState(null);

    const toggleIngredients = (index) => {
        if (activeRecipeIndex === index) {
            setActiveRecipeIndex(null);
        } else {
            setActiveRecipeIndex(index);
        }
    };

    const toggleLike = async (recipeId) => {
        try {
            const response = await sendRequest({
                route: `/user/recipes/${recipeId}/toggle-like`,
                method: requestMethods.POST,
            });
            
            setRecipes((prevRecipes) => {
                return prevRecipes.map((recipe) => {
                    if (recipe.id === recipeId) {
                        return {
                            ...recipe,
                            likes: response.like_count > 0 ? [{ user_id: response.user_id }] : [],
                        };
                    }
                    return recipe;
                });
            });
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const toggleShoppingList = async (recipeId) => {
        try {
            const response = await sendRequest({
                route: `/user/shopping-lists/toggle/${recipeId}`,
                method: requestMethods.POST,
            });
            console.log(response)
    
            setRecipes((prevRecipes) => {
                return prevRecipes.map((recipe) => {
                    if (recipe.id === recipeId) {
                        return {
                            ...recipe,
                            shoppingList: !recipe.shoppingList,
                        };
                    }
                    return recipe;
                });
            });
        } catch (error) {
            console.error('Failed to toggle shopping list:', error);
        }
    };
    

    return (
        <div className="cards-container">
            {recipes.map((recipes,index)=>(
                <div className="card" key={index}>
                    <img className='recipe-img' src={`http://127.0.0.1:8000/storage/${recipes.image_path}`} alt="recipe img" />

                    <div className='recipe-cuisine'>{recipes.cuisine}</div>
                    <div className='name-heart'>
                        <div className='recipe-name'>{recipes.name}</div>
                        <div className='card-icons'>
                            <AiOutlinePlusCircle
                                size={28}
                                color={recipes.shoppingList ? "blue" : "black"}
                                onClick={() => toggleShoppingList(recipes.id)}
                            />
                            {recipes.likes && recipes.likes.length > 0 ? (
                                <AiFillHeart
                                    size={28}
                                    color="red"
                                    onClick={() => toggleLike(recipes.id)}
                                />
                            ) : (
                                <AiOutlineHeart
                                    size={28}
                                    onClick={() => toggleLike(recipes.id)}
                                />
                            )}
                        </div>
                    </div>

                    <div className='recipe-ingredient' onClick={() => toggleIngredients(index)}>Show Ingredients</div>
                    {activeRecipeIndex === index && (
                        <ul className="ingredients-list">
                            {recipes.ingredients.map((ingredient, ingredientIndex) => (
                                <li key={ingredientIndex}>{ingredient.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Cards