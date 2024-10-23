<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Option>
 */
class OptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $correct = $this->faker->boolean;

        return [
            //
            'title' => $this->faker->sentence,
            'correct' => $correct,
            'description' => $correct ? $this->faker->sentence : null,
            'question_id' => $this->faker->numberBetween(1, 400),
        ];
    }
}
