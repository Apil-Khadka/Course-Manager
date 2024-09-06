<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;

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
    public function create()
    {
        // TODO: Implement create method
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        $lesson = Lesson::create($request->validated());
        return new LessonResource($lesson);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson)
    {
        return new LessonResource($lesson);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        // TODO: Implement edit
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $lesson->update($request->validated());
        return new LessonResource($lesson);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return response()->nocontent;
    }
}
