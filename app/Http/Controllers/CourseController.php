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
        // Generate a unique course code
        $courseCode = $this->generateCourseCode();

        // Return the view with the generated course code
        return inertia('Course/create', ['course_code' => $courseCode]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $course = Course::create($request->validated());
        return redirect()->route('courses.show', $course->id)->with('success', 'Course created successfully.');
    }

    private function generateCourseCode()
    {
        // Implement logic to generate a unique course code
        $prefix = 'COURSE';
        $latestCourse = Course::orderBy('created_at', 'desc')->first();  // Ensure we get the latest by created_at

        // Extract the numeric part of the course code, default to 0 if not found
        $number = $latestCourse
            ? (intval(substr($latestCourse->course_code, -4)) + 1)
            : 1;

        // Return the formatted course code
        return $prefix . str_pad($number, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::with('lessons', 'assigned_to')->findOrFail($id);
        return inertia('Course/show', [
            'course' => new CourseResource($course),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $course = Course::findOrFail($id);  // Fetch the course by its ID

        return inertia('Course/edit', [
            'course' => [
                'data' => $course,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return redirect()
            ->back()
            ->with('success', 'Course updated successfully');
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
