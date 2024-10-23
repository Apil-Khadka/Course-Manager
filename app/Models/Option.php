<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'correct',
        'description',
        'question_id',
    ];

    public function questions()
    {
        return $this->belongsTo(Question::class);
    }
}
