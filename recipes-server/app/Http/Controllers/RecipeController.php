<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function createRecipe(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'cuisine' => 'required|string',
                'image' => 'required|string|max:2048',
                'ingredients' => 'required|array',
            ]);

            $base64Image = $request->input('image');
            $decodedImage = base64_decode($base64Image);

            $filename = 'recipe_' . time() . '.jpg';
            Storage::disk('public')->put('recipe_images/' . $filename, $decodedImage);
            $imagePath = 'recipe_images/' . $filename;

            $user = Auth::user();

            $recipe = new Recipe([
                'user_id' => $user->id,
                'name' => $request->name,
                'cuisine' => $request->cuisine,
                'image_path' => $imagePath,
            ]);
            $recipe->save();

            foreach ($request->ingredients as $ingredientId) {
                $ingredient = Ingredient::find($ingredientId);
                if ($ingredient) {
                    $recipe->ingredients()->attach($ingredient);
                }
            }

            $imageUrl = Storage::url('recipe_images/' . $filename);

            return response()->json([
                'status' => 'success',
                'message' => 'Recipe created successfully',
                'recipe' => $recipe,
                'image_url' => $imageUrl,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
