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

        /*
         * User::factory()->create([
         *     'name' => 'God Win',
         *     'email' => 'godwin@example.com',
         *     'password' => bcrypt('YouGotGuts'),
         *     'admin' => true,
         * ]);
         * $this->call(CourseSeeder::class);
         * User::factory(100)->create();
         * $this->call([
         *     // CourseSeeder::class,
         *     LessonSeeder::class,
         *     QuizSeeder::class,
         *     QuestionSeeder::class,
         *     OptionSeeder::class,
         *     ResultSeeder::class
         * ]);
         *
         * User::factory()->create()->courses()->attach(Course::all()->random(100));
         * User::factory()->create()->lessons()->attach(Course::all()->random(100));
         */
        $this->createAdminUser();
        $this->createCoursesAndLessons();
        $this->attachUsersToCoursesAndLessons();
        $this->createOtherModels();
    }

    private function createAdminUser(): void
    {
        User::factory()->create([
            'name' => 'God Win',
            'email' => 'godwin@example.com',
            'password' => bcrypt('YouGotGuts'),
            'admin' => true,
        ]);
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('IGotGuts'),
            'admin' => false,
        ]);
    }

    private function createCoursesAndLessons(): void
    {
        $courses = Course::factory(50)->create();

        foreach ($courses as $course) {
            $lessons = Lesson::factory(10)->make();  // Create lessons without saving
            $course->lessons()->saveMany($lessons);  // Efficiently save lessons associated with the course
        }
    }

    private function attachUsersToCoursesAndLessons(): void
    {
        $users = User::factory(30)->create();

        foreach ($users as $user) {
            // Attach random courses to the user (1 to 5 courses)
            $attachedCourses = Course::all()->random(rand(1, 50));
            $user->courses()->attach($attachedCourses);

            // For each course attached to the user, attach some random lessons from that course
            foreach ($attachedCourses as $course) {
                // Fetch lessons from the course as a collection
                $lessons = $course->lessons()->get();

                // Pick random lessons from the course (1 to the number of lessons in the course)
                $randomLessons = $lessons->random(rand(1, min(5, $lessons->count())));

                // Attach these random lessons to the user
                $user->lessons()->attach($randomLessons);
            }
        }
    }

    private function createOtherModels(): void
    {
        // Call seeders for quizzes, questions, options, results, etc.
        $this->call([
            QuizSeeder::class,
            QuestionSeeder::class,
            OptionSeeder::class,
            ResultSeeder::class,
        ]);
    }
}
