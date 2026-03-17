<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeopleController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\ProjectsController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\MenuItemsController;
use App\Http\Controllers\Api\PagesController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\PublicationsController;
use App\Http\Controllers\Api\SiteConfigController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\ContactController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Menu routes
    Route::get('/menu', [MenuItemsController::class, 'index']);
    Route::post('/menu', [MenuItemsController::class, 'store']);
    Route::put('/menu/{id}', [MenuItemsController::class, 'update']);
    Route::delete('/menu/{id}', [MenuItemsController::class, 'destroy']);

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

    // News routes
    Route::get('/news', [NewsController::class, 'index']);
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);

    // Publications routes
    Route::get('/publications', [PublicationsController::class, 'index']);
    Route::post('/publications', [PublicationsController::class, 'store']);
    Route::put('/publications/{id}', [PublicationsController::class, 'update']);
    Route::delete('/publications/{id}', [PublicationsController::class, 'destroy']);

    // Site Config routes
    Route::get('/site-config', [SiteConfigController::class, 'index']);
    Route::put('/site-config', [SiteConfigController::class, 'update']);

    // Users routes
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/users', [UsersController::class, 'store']);
    Route::put('/users/{id}', [UsersController::class, 'update']);
    Route::delete('/users/{id}', [UsersController::class, 'destroy']);

    // Upload routes
    Route::post('/upload', [UploadController::class, 'upload']);
    Route::delete('/upload', [UploadController::class, 'delete']);

    // Contact submissions routes
    Route::get('/contact-submissions', [ContactController::class, 'index']);
    Route::put('/contact-submissions/{id}/read', [ContactController::class, 'markAsRead']);
    Route::delete('/contact-submissions/{id}', [ContactController::class, 'destroy']);
});

// Public read-only routes
Route::get('/people', [PeopleController::class, 'index']);
Route::get('/projects', [ProjectsController::class, 'index']);
Route::get('/products', [ProductsController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('/publications', [PublicationsController::class, 'index']);
Route::get('/site-config', [SiteConfigController::class, 'index']);
Route::get('/users', [UsersController::class, 'index']);
Route::get('/settings', [SettingsController::class, 'index']);
Route::get('/menu', [MenuItemsController::class, 'index']);
Route::get('/pages', [PagesController::class, 'index']);
Route::get('/pages/{slug}', [PagesController::class, 'show']);

// Public contact form submission
Route::post('/contact', [ContactController::class, 'store']);
