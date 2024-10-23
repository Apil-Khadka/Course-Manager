<?php

namespace Database\Seeders;

use App\Models\Attempt;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;
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

            foreach ($lessons as $lesson) {
                // Create a quiz for each lesson
                $quiz = Quiz::factory()->create(['lesson_id' => $lesson->id]);

                // Create 6 questions for the quiz
                for ($i = 0; $i < 6; $i++) {
                    $question = Question::factory()->create(['quiz_id' => $quiz->id]);

                    // Create 4 options for each question, with one correct option
                    $correctOptionIndex = rand(0, 3);
                    for ($j = 0; $j < 4; $j++) {
                        Option::factory()->create([
                            'question_id' => $question->id,
                            'correct' => ($j === $correctOptionIndex) ? 1 : 0,
                        ]);
                    }
                }
            }
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
        // Call other seeders for results, etc.
        $this->call([
            ResultSeeder::class,
        ]);
    }
}
