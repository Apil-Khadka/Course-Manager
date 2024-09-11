<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Models\User;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/user/data/{id}', function ($id) {
        // $user = User::with(['courses.lessons'])->whereHas('courses.lessons')->findOrFail($id);
        $user = User::with(['courses' => function ($query) use ($id) {
            $query->with(['lessons' => function ($lessonQuery) use ($id) {
                $lessonQuery->whereHas('users', function ($userQuery) use ($id) {
                    $userQuery->where('user_id', $id);
                });
            }]);
        }])->findOrFail($id);
        return Inertia::render('User/showdata', [
            'userData' => $user,
        ]);
    })->name('user.data');

    Route::resource('courses', CourseController::class);
    Route::resource('lessons', LessonController::class);
    Route::resource('quiz', QuizController::class);
});

require __DIR__ . '/auth.php';
