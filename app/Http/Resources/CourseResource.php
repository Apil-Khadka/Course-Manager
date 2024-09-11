<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'course_code' => $this->course_code,
            'created_by' => $this->when(auth()->user()->admin, $this->created_by),
            'updated_by' => $this->when(auth()->user()->admin, $this->updated_by),
            'assigned_to' => $this->whenLoaded('assigned_to'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'lessons' => LessonResource::collection($this->whenLoaded('lessons')),
        ];
    }
}
