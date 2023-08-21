<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function planMeal(Request $request)
    {
        try {
            $request->validate([
                'recipe_id' => 'required|exists:recipes,id',
                'day_of_week' => 'required|integer|between:1,7',
            ]);

            $user = Auth::user();
            $recipeId = $request->recipe_id;
            $dayOfWeek = $request->day_of_week;

            $existingEvent = CalendarEvent::where([
                'user_id' => $user->id,
                'recipe_id' => $recipeId,
                'day_of_week' => $dayOfWeek,
            ])->first();

            if ($existingEvent) {
                return response()->json(['message' => 'Meal is already planned for this day.'], 400);
            }

            $event = new CalendarEvent([
                'user_id' => $user->id,
                'recipe_id' => $recipeId,
                'day_of_week' => $dayOfWeek,
            ]);
            $event->save();

            return response()->json(['message' => 'Meal planned successfully']);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getPlannedMeals()
    {
        try {

            $user = Auth::user();

            $plannedMeals = CalendarEvent::where('user_id', $user->id)
                ->with('recipe')
                ->get();

            if ($plannedMeals->isEmpty()) {
                return response()->json(['message' => 'No planned meals found for the user.'], 404);
            }

            return response()->json(['planned_meals' => $plannedMeals]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
