import Groq from "groq-sdk";

export async function getGroqChatCompletion(message: string) {
    try {
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama3-8b-8192", // Use your model here
        });

        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Error in Groq API call:", error);
        throw new Error("Failed to fetch chat completion.");
    }
}
