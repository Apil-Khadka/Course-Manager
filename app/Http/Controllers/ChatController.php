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

    public function getChatCompletion(Request $request)
    {
        $message = $request->input('message');

        try {
            $response = $this->groqService->getChatCompletion($message);
            return response()->json(['content' => $response]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

?>
