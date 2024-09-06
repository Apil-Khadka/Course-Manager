<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class LessonResource extends JsonResource
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
            'content' => $this->content,
            'course_id' => $this->course_id,
            'created_by' => $this->when(auth()->user()->admin, $this->created_by),
            'updated_by' => $this->when(auth()->user()->admin, $this->updated_by),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
