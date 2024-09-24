<?php
namespace App\Providers;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class GroqService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.groq.com/openai/v1/',  // Replace with actual API base URI if different
            'headers' => [
                'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    public function getChatCompletion($message)
    {
        try {
            $response = $this->client->post('chat/completions', [
                'json' => [
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => "
                            You are a cybersecurity expert. Answer all questions and provide advice related only to cybersecurity topics.
                            Don't keep saying you are a cybersecurity expert.
                            ",
                        ],
                        [
                            'role' => 'user',
                            'content' => $message,
                        ],
                    ],
                    'model' => 'llama3-8b-8192',  // Use your model here
                ],
            ]);

            $body = json_decode($response->getBody()->getContents(), true);
            return $body['choices'][0]['message']['content'] ?? '';
        } catch (RequestException $e) {
            // Handle the exception or log it
            Log::error('Error in Groq API call: ' . $e->getMessage());
            throw new \Exception('Failed to fetch chat completion.');
        }
    }
}
?>
