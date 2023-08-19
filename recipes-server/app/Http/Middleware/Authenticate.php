<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('unauthorized');
    }

    // protected function redirectTo($request)
    // {
    //     if (!$request->expectsJson()) {
    //         return route('unauthorized'); // Redirect to unauthorized route for web requests
    //     }
    // }
}
