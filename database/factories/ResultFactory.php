<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'score' => $this->faker->numberBetween(1, 33),
            'question_count' => $this->faker->numberBetween(1, 22),
            'user_id' => $this->faker->numberBetween(1, 22),
            'quiz_id' => $this->faker->numberBetween(1, 22),
            'lesson_id' => $this->faker->numberBetween(1, 22),
        ];
    }
}
