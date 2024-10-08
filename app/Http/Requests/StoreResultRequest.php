<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResultRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'quiz_id' => ['required', 'integer', 'exists:quizzes,id'],
            'score' => ['required', 'integer'],
            'question_count' => ['required', 'integer'],
        ];
    }
}
