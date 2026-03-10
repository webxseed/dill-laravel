<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeopleController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\ProjectsController;

use App\Http\Controllers\Api\PagesController;
use App\Http\Controllers\Api\SettingsController;

// People routes
Route::get('/people', [PeopleController::class, 'index']);
Route::post('/people', [PeopleController::class, 'store']);
Route::get('/people/{person}', [PeopleController::class, 'show']);
Route::put('/people/{person}', [PeopleController::class, 'update']);
Route::delete('/people/{person}', [PeopleController::class, 'destroy']);

// Products routes
Route::get('/products', [ProductsController::class, 'index']);
Route::post('/products', [ProductsController::class, 'store']);
Route::get('/products/{product}', [ProductsController::class, 'show']);
Route::put('/products/{product}', [ProductsController::class, 'update']);
Route::delete('/products/{product}', [ProductsController::class, 'destroy']);

// Projects routes
Route::get('/projects', [ProjectsController::class, 'index']);
Route::post('/projects', [ProjectsController::class, 'store']);
Route::get('/projects/{project}', [ProjectsController::class, 'show']);
Route::put('/projects/{project}', [ProjectsController::class, 'update']);
Route::delete('/projects/{project}', [ProjectsController::class, 'destroy']);

// Settings routes
Route::get('/settings', [SettingsController::class, 'index']);
Route::put('/settings', [SettingsController::class, 'update']);

// Pages routes
Route::get('/pages', [PagesController::class, 'index']);
Route::get('/pages/{slug}', [PagesController::class, 'show']);
Route::post('/pages', [PagesController::class, 'store']);
Route::put('/pages/{id}', [PagesController::class, 'update']);
Route::delete('/pages/{id}', [PagesController::class, 'destroy']);
