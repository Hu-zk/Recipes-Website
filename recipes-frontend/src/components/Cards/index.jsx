import React from 'react'

function Cards({recipes}) {

    return (
        <div className="cards-container">
            {recipes.map((recipes,index)=>(
                <div className="card" key={index}>
                    <img className='recipe-img' src={`http://127.0.0.1:8000/storage/${recipes.image_path}`} alt="recipe img" />
                    <div>{recipes.name}</div>
                </div>
            ))}
        </div>
    )
}

export default Cards