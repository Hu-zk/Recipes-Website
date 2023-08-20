<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\ShoppingList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShoppingController extends Controller
{
    public function addToShoppingList($recipeId)
    {
        try {
            $recipe = Recipe::findOrFail($recipeId);
            $user = Auth::user();

            $alreadyInList = $user->shoppingList->contains($recipe);

            if ($alreadyInList) {
                return response()->json(['message' => 'Recipe is already in the shopping list.'], 400);
            }

            $shoppingList = new ShoppingList([
                'user_id' => $user->id,
                'recipe_id' => $recipe->id,
            ]);
            $shoppingList->save();

            return response()->json(['message' => 'Recipe added to shopping list successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function toggleShoppingList($recipeId)
    {
        try {
            $recipe = Recipe::findOrFail($recipeId);
            $user = Auth::user();

            $alreadyInList = $user->shoppingList->contains($recipe);

            if ($alreadyInList) {
                $user->shoppingList()->detach($recipe);
                $message = 'Recipe removed from shopping list successfully';
            } else {
                $shoppingList = new ShoppingList([
                    'user_id' => $user->id,
                    'recipe_id' => $recipe->id,
                ]);
                $shoppingList->save();
                $message = 'Recipe added to shopping list successfully';
            }

            return response()->json(['message' => $message]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function getShoppingList()
    {
        try {
            $user = Auth::user();

            $shoppingList = $user->shoppingList;

            return response()->json(['shopping_list' => $shoppingList]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
