<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = Lesson::all();
        return LessonResource::collection($lessons);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $courseId = $request->input('course_id');
        return Inertia::render('Lesson/create', ['course_id' => $courseId]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        $lesson = Lesson::create($request->validated());
        return redirect()
            ->back()
            ->with('success', 'Lesson created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson)
    {
        return Inertia::render('Lesson/show', ['lessons' => new LessonResource($lesson)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        return Inertia::render('Lesson/edit', ['lessons' => new LessonResource($lesson)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $lesson->update($request->validated());
        return redirect()
            ->back()
            ->with('success', 'Lesson updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return redirect()
            ->route('courses.show', $lesson->course_id);
    }

    public function assignLessonToUser($userId, $lessonId)
    {
        $user = User::findOrFail($userId);
        $lesson = Lesson::findOrFail($lessonId);

        // Assign the lesson to the user
        $user->lessons()->attach($lessonId);

        // Automatically assign the course if not already assigned
        $course = $lesson->course;
        if (!$user->courses->contains($course->id)) {
            $user->courses()->attach($course->id);
        }

        return response()->json(['message' => 'Lesson and course assigned successfully']);
    }
}
