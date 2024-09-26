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
            'video_url' => $this->video_url,
            'course_id' => $this->course_id,
            'created_by' => $this->when(auth()->user()->admin, optional($this->created_by)->name),
            'updated_by' => $this->when(auth()->user()->admin, optional($this->updated_by)->name),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'assigned_to' => $this->whenLoaded('assigned_to'),
        ];
    }
}
