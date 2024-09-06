<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // check is user is admin
        return auth()->user()->admin;
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'course_code' => ['required', 'string', 'max:10'],
            'created_by' => ['required', 'integer', 'exists:users,id'],
            'updated_by' => ['required', 'integer', 'exists:users,id'],
            'assigned_to' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
