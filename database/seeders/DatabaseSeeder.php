<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'God Win',
            'email' => 'godwin@example.com',
            'password' => bcrypt('YouGotGuts'),
            'admin' => true,
        ]);
        User::factory(22)->create();

        $this->call([
            CourseSeeder::class,
            LessonSeeder::class,
            QuizSeeder::class,
            QuestionSeeder::class,
            OptionSeeder::class,
            ResultSeeder::class
        ]);
    }
}
