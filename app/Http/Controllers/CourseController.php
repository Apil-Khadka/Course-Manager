<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Course::query();
        $courses = $query->paginate(10);

        return inertia('Course/index', [
            'courses' => CourseResource::collection($courses),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // TODO: Implement create method
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $course = Course::create($request->validated());
        return new CourseResource($course);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::with('lessons')->findOrFail($id);
        return inertia('Course/show', [
            'course' => new CourseResource($course),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        // TODO: Implement edit method
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return new CourseResource($course);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index');
    }
}
