<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

// Admin routes (served via React)
Route::get('/admin', function () {
    return view('index');
});

// SPA fallback - must be last
Route::get('/{path?}', function () {
    return view('index');
})->where('path', '.*');
