<?php

use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/notes', [NoteController::class, 'index'])->name('note.index');
Route::get('/notes/{id}', [NoteController::class, 'show'])->name('notes.show');
Route::post('/notes/create', [NoteController::class, 'store'])->name('notes.store');
Route::put('/notes/update/{id}', [NoteController::class, 'update'])->name('notes.update');
Route::delete('/notes/delete/{id}', [NoteController::class, 'destroy'])->name('notes.destroy');
//Route::get('note/create', [NoteController::class, 'create'])->name('notes.create');
//Route::get('note/{id}/edit', [NoteController::class, 'edit'])->name('notes.edit');


//Route::resource('notes', NoteController::class);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
