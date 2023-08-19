<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'guest'], function () {

    Route::get("unauthorized", [AuthController::class, "unauthorized"]);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->name("unauthorized");
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {


    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
});
