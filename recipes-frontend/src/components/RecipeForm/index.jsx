import React, { useState } from 'react';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';
import "./style.css"


function RecipeForm() {

    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');

    const handleRecipeCreation = async (event) => {
        event.preventDefault();

        try {
            const response = await sendRequest({
                route: "/recipes/create",
                method: requestMethods.POST,
                body:{
                    name,
                    cuisine,
                }
            });
            console.log(response)
            setName("")
            setCuisine("")

        } catch (error) {
            console.error('failed:', error);
        }
    };

    return (
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Create Recipe
                    </h1>
                </div>

                <form className="create-form">

                        <div className="label-input">
                            <label htmlFor="name">Name </label>
                            <input id="name" name="name" type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="cuisine">Cuisine </label>
                            <input id="cuisine" name="cuisine" type="cuisine" required placeholder="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}/>
                        </div>

                    <button className='black-button' type="submit" onClick={handleRecipeCreation}>Create</button>
                </form>
            </div>
    )
}

export default RecipeForm