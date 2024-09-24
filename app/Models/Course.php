<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'course_code', 'created_by', 'updated_by'];

    // make relations
    public function assigned_to()
    {
        return $this
            ->belongsToMany(User::class, 'course_user')
            ->withTimestamps();
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
}
