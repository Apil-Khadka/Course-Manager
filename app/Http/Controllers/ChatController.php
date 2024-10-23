<?php

namespace App\Http\Controllers;

use App\Providers\GroqService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    protected $groqService;

    public function __construct(GroqService $groqService)
    {
        $this->groqService = $groqService;
    }

    /* public function getChatCompletion(Request $request)
    {
        $message = $request->input('message');

        try {
            $response = $this->groqService->getChatCompletion($message);
            return response()->json(['content' => $response]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    } */
    public function getChatCompletion(Request $request)
    {
        $message = $request->input('message');

        try {
            // Step 1: Initial chat request to Groq
            $response = $this->groqService->getChatCompletion($message);

            // Step 2: Check if the Groq response contains a course code request
            $courseCode = $this->parseForCourseCode($response);

            if ($courseCode) {
                // Step 3: Fetch full course details if a specific course is mentioned
                $courseData = Course::with(['lessons' => function ($query) {
                    $query->select('id', 'title');  // Select only the 'id', 'title', and 'course_id' for the lessons
                }])
                    ->where('course_code', $courseCode)
                    ->first();

                if (!$courseData) {
                    return response()->json(['error' => 'Course not found'], 404);
                }

                // Step 4: Call Groq again with the detailed course data
                $detailedResponse = $this->groqService->getChatCompletion($message, $courseData);
                return response()->json(['content' => $detailedResponse]);
            }

            return response()->json(['content' => $response]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Helper function to parse the response for a course code request

    protected function parseForCourseCode($response)
    {
        /* // Check if the response contains a course code in a specific phrase
        if (preg_match('/course code is\s*"?([a-zA-Z0-9]+)"?/i', $response, $matches)) {
            return $matches[1];  // Return the course code
        } */

        return null;  // Return null if no course code is found
    }
}

?>
