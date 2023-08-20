<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function display()
    {
        try {
            $ingredients = Ingredient::all();

            if ($ingredients->isEmpty()) {
                return response()->json(['message' => 'No ingredients found for the given search criteria.'], 404);
            }

            return response()->json(['ingredients' => $ingredients]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while processing the request.'], 500);
        }
    }
}
