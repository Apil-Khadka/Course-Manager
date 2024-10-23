<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Http\Resources\QuizResource;
use App\Models\Attempt;
use App\Models\Lesson;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quizzes = Quiz::with(['questions' => fn($query) => $query->with('options')])->get();

        return QuizResource::collection($quizzes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if (!auth()->user()->admin) {
            return abort(403, 'unauthorized action');;  // Unauthorized
        }

        // Get the lesson ID from the request
        $lessonId = $request->query->keys()[0];

        // Check if a quiz already exists for the given lesson ID
        $quizExists = Quiz::where('lesson_id', $lessonId)->exists();

        // If a quiz exists, you might want to redirect or show a message
        if ($quizExists) {
            return redirect()->route('quiz.edit', $lessonId);
        }

        // If no quiz exists, proceed to show the create quiz form
        return inertia('Quiz/create', ['lesson_id' => $lessonId]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request)
    {
        // Create the quiz using validated data
        $quiz = Quiz::create($request->validated());

        // Assuming you have questions and options in the request
        if ($request->has('questions')) {
            foreach ($request->questions as $questionData) {
                // Create the question linked to the quiz
                $question = $quiz->questions()->create([
                    'title' => $questionData['title'],
                    'quiz_id' => $quiz->id,
                ]);

                // Check if options are provided for the question
                if (isset($questionData['options'])) {
                    foreach ($questionData['options'] as $optionData) {
                        // Create each option linked to the question
                        $question->options()->create([
                            'title' => $optionData['title'],
                            'correct' => $optionData['correct'],  // Assuming 'correct' is a boolean
                            'description' => $optionData['description'],
                            'question_id' => $question->id,
                        ]);
                    }
                }
            }
        }

        // Return a resource or response
        return new QuizResource($quiz);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Find the lesson with quizzes and their questions
        $lesson = Lesson::with(['quizzes.questions.options'])->findOrFail($id);

        // Get the filtered quizzes with uncompleted questions
        $filteredQuizzes = $this->getQuizQuestions($lesson->quizzes);

        // Pass the filtered quizzes to the frontend
        // return QuizResource::collection($filteredQuizzes);
        return inertia('Quiz/index', ['Quiz' => QuizResource::collection($filteredQuizzes)]);
    }

    public function getQuizQuestions($quizzes)
    {
        $userId = auth()->id();  // Use correct user ID

        // Loop through each quiz and filter out completed questions
        foreach ($quizzes as $quiz) {
            // Fetch all question IDs the user has completed for this quiz
            $completedQuestions = Attempt::where('user_id', $userId)
                ->where('quiz_id', $quiz->id)
                ->pluck('question_id');

            // Filter out questions that have already been completed
            $quiz->questions = $quiz->questions->filter(function ($question) use ($completedQuestions) {
                return !in_array($question->id, $completedQuestions->toArray());
            });
        }

        return $quizzes;
    }

    public function submitAnswer(Request $request)
    {
        $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'question_id' => 'required|exists:questions,id',
            'option_id' => 'required|exists:options,id',
        ]);

        $question = Question::findOrFail($request->question_id);
        $option = Option::findOrFail($request->option_id);
        $isCorrect = $option->correct;

        if ($isCorrect) {
            Attempt::create([
                'user_id' => auth()->id(),
                'quiz_id' => $request->quiz_id,
                'question_id' => $request->question_id,
            ]);
        }

        return [
            'success' => $isCorrect,
            'description' => $isCorrect ? $option->description : null,
        ];
    }

    public function completeQuiz(Request $request)
    {
        $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'user_id' => 'required|exists:users,id',
        ]);

        // Logic to handle quiz completion, store progress, etc.
        return response()->json(['message' => 'Quiz completed!']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        if (!auth()->user()->admin) {
            return redirect()->route('quiz.show', $quiz->id);
        }

        // Load the questions and options for the quiz
        $quiz->load('questions.options');

        // Pass the quiz data (with questions and options) to the Inertia view
        return inertia('Quiz/edit', [
            'quiz' => $quiz,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        $quiz->update($request->validated());
        if ($request->has('questions')) {
            foreach ($request->questions as $questionData) {
                $question = $quiz->questions()->updateOrCreate([
                    'id' => $questionData['id'],
                ], [
                    'title' => $questionData['title'],
                    'quiz_id' => $quiz->id,
                ]);
                if (isset($questionData['options'])) {
                    foreach ($questionData['options'] as $optionData) {
                        $question->options()->updateOrCreate([
                            'id' => $optionData['id'],
                        ], [
                            'title' => $optionData['title'],
                            'correct' => $optionData['correct'],
                            'description' => $optionData['description'],
                            'question_id' => $question->id,
                        ]);
                    }
                }
            }
        }
        return new QuizResource($quiz);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return redirect()->route('quiz.create', $quiz->id);
    }
}
