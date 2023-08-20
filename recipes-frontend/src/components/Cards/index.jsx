import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Cards({recipes}) {

    const [activeRecipeIndex, setActiveRecipeIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const toggleIngredients = (index) => {
        if (activeRecipeIndex === index) {
            setActiveRecipeIndex(null);
        } else {
            setActiveRecipeIndex(index);
        }
    };

    const toggleFavorite = (recipeId) => {
        if (favorites.includes(recipeId)) {
            setFavorites(favorites.filter(id => id !== recipeId));
        } else {
            setFavorites([...favorites, recipeId]);
        }
    };

    const isFavorite = (recipeId) => favorites.includes(recipeId);


    return (
        <div className="cards-container">
            {recipes.map((recipes,index)=>(
                <div className="card" key={index}>
                    <img className='recipe-img' src={`http://127.0.0.1:8000/storage/${recipes.image_path}`} alt="recipe img" />

                        <div className='recipe-cuisine'>{recipes.cuisine}</div>
                    <div className='name-heart'>
                        <div className='recipe-name'>{recipes.name}</div>
                        <div className='heart-icon' onClick={() => toggleFavorite(recipes.id)}>
                            {isFavorite(recipes.id) ? <AiFillHeart size={28} color="red" /> : <AiOutlineHeart size={28} />}
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