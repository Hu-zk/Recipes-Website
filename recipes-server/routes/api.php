<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ShoppingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'guest'], function () {

    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::get('recipes/display', [RecipeController::class, 'display']);
    Route::get('ingredients/display', [IngredientController::class, 'display']);


    Route::post("recipes/create", [RecipeController::class, "createRecipe"]);
    Route::get('recipes/search/{searchItem}', [RecipeController::class, 'search']);

    Route::post('recipes/comment', [RecipeController::class, 'commentRecipe']);
    Route::post('recipes/{recipeId}/toggle-like', [RecipeController::class, 'toggleLike']);
    Route::get('recipes/{recipe}/share-url', [RecipeController::class, 'getRecipeShareUrl']);

    Route::post('shopping-lists/toggle/{recipeId}', [ShoppingController::class, 'toggleShoppingList']);
    Route::get('shopping-lists', [ShoppingController::class, 'getShoppingList']);

    Route::post('calendar/events', [CalendarController::class, 'planMeal']);
    Route::post('calendar/events/{eventId}', [CalendarController::class, 'deleteEvent']);

    Route::get('calendar/events', [CalendarController::class, 'getPlannedMeals']);

    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
});
