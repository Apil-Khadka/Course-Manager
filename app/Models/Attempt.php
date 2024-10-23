<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attempt extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'quiz_id', 'question_id'];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function quizzes()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function questions()
    {
        return $this->belongsTo(Question::class);
    }
}
