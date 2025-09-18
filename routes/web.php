<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
//'auth',
Route::middleware([ 'verified'])->group(function () {
    //Route::get('dashboard', function () {
    //    return Inertia::render('dashboard');
    //})->name('dashboard');
    Route::get('/dashboard', [CategoryController::class, 'index'])->name('dashboard');
});

// Test without auth temporarily
Route :: get('/categories', [CategoryController::class,'index'])->name('categories.index');
Route :: get('/categories/create', [CategoryController::class,'create'])->name('categories.create');
Route :: post('/categories', [CategoryController::class,'store'])->name('categories.store');
Route :: delete('/categories/destroy/{id}', [CategoryController::class,'destroy'])->name('categories.destroy');
Route :: get('/categories/edit/{id}', [CategoryController::class,'edit'])->name('categories.edit');
Route :: patch('/category/update/{id}', [CategoryController::class,'update'])->name('categories.update');

Route::redirect('/products', '/products/index');
Route::get('/products/index', [ProductController::class,'index'])->name('products.index');
Route :: get('/products/create', [ProductController::class,'create'])->name('products.create');
Route :: post('/products', [ProductController::class,'store'])->name('products.store');
Route :: get('/products/show/{id}', [ProductController::class,'show'])->name('products.show');
Route :: delete('/products/delete/{id}', [ProductController::class,'destroy'])->name('products.destroy');
Route :: get('/products/edit/{id}', [ProductController::class,'edit'])->name('products.edit');
Route :: patch('/products/update/{id}', [ProductController::class,'update'])->name('products.update');

Route::middleware('auth')->group(function () {
    #Route :: resource('categories', CategoryController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
