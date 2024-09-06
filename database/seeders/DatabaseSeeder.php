<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
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
        $this->call(CourseSeeder::class);
        User::factory(22)->create();
        $this->call([
            // CourseSeeder::class,
            LessonSeeder::class,
            QuizSeeder::class,
            QuestionSeeder::class,
            OptionSeeder::class,
            ResultSeeder::class
        ]);

        User::factory()->create()->courses()->attach(Course::all()->random(3));
        User::factory()->create()->lessons()->attach(Course::all()->random(3));
    }
}
