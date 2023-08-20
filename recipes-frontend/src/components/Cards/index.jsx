import React, { useState } from 'react'

function Cards({recipes}) {

    const [activeRecipeIndex, setActiveRecipeIndex] = useState(null);

    const toggleIngredients = (index) => {
        if (activeRecipeIndex === index) {
            setActiveRecipeIndex(null);
        } else {
            setActiveRecipeIndex(index);
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
                        <i className="fa-regular fa-heart menu-icons"></i>
                    </div>
                    <div className='recipe-ingredient' onClick={() => toggleIngredients(index)}>Show Ingredients</div>
                    {activeRecipeIndex === index && (
                        <ul className="ingredients-list">
                            {recipes.ingredients.map((ingredient, ingredientIndex) => (
                                <li key={ingredientIndex}>{ingredient.name}</li>
                            ))}
                        </ul>
                    )}
                    {/* <select className="ingredients-dropdown">
                    <b>Ingredients</b>
                        {recipes.ingredients.map((ingredient, ingredientIndex) => (
                            <option key={ingredientIndex}>{ingredient.name}</option>
                        ))}
                    </select> */}

                </div>
            ))}
        </div>
    )
}

export default Cards