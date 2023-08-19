<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'guest'], function () {

    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::post("recipes/create", [RecipeController::class, "createRecipe"]);
    Route::get('recipes/search/{searchItem}', [RecipeController::class, 'search']);

    Route::post('recipes/comment', [RecipeController::class, 'commentRecipe']);
    Route::post('recipes/{recipeId}/toggle-like', [RecipeController::class, 'toggleLike']);
    Route::get('recipes/{recipe}/share-url', [RecipeController::class, 'getRecipeShareUrl']);

    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
});
