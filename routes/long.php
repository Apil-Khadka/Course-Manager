<?php

use App\Models\Course;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/user/data/{id}', function ($id) {
    $authUser = auth()->user();  // Get the authenticated user

    // Check if the authenticated user is an admin
    if ($authUser->admin) {
        // Admins can retrieve all data
        $user = User::with(['courses.lessons'])->findOrFail($id);
    } else {
        // Non-admin users can only retrieve their own data
        if ($authUser->id != $id) {
            abort(403, 'Unauthorized action.');
        } else if ($authUser->id == $id) {
            $user = User::with(['courses.lessons'])->findOrFail($id);
        }

        // Retrieve data for the authenticated user
        $user = User::with(['courses' => function ($query) use ($id) {
            $query->with(['lessons' => function ($lessonQuery) use ($id) {
                $lessonQuery->whereHas('assigned_to', function ($userQuery) use ($id) {
                    $userQuery->where('user_id', $id);
                });
            }]);
        }])->findOrFail($id);
    }

    return Inertia::render('User/showdata', [
        'userData' => $user,
    ]);
})->name('user.data');

Route::post('/assign/courses/{id}', function ($id) {
    $user = auth()->user();
    $course = Course::findOrFail($id);
    $course->assigned_to()->attach($user->id);
    return back();
})->name('assign.courses');

Route::post('/assign/lessons/{id}', function ($id) {
    $user = auth()->user();
    $lesson = Lesson::findorFail($id);
    $lesson->assigned_to()->attach($user->id);
    return back();
})->name('assign.lessons');

?>
