<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    // create fillable
    protected $fillable = ['title', 'content', 'video_url', 'course_id', 'created_by', 'updated_by'];

    public function courses()
    {
        return $this->belongsTo(Course::class);
    }

    public function assigned_to()
    {
        return $this
            ->belongsToMany(User::class, 'lesson_user')
            ->withTimestamps();
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
