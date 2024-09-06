<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function users()
    {
        return $this
            ->belongsToMany(User::class, 'results')
            ->withPivot('score', 'question_count', 'lesson_id')
            ->withTimestamps();
    }
}
