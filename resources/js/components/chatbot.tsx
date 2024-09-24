import React, { useState, useEffect, useRef } from "react";
import { Send, Edit2, Trash2, Check, X } from "lucide-react";
import axios from "axios";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    isEditing?: boolean;
}

export default function EnhancedElegantChatComponent() {
    const [userInput, setUserInput] = useState<string>("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [editContent, setEditContent] = useState<string>(""); // New state to track editing content
    const [editingMessageId, setEditingMessageId] = useState<string | null>(
        null,
    ); // Track the message being edited
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = async () => {
        if (!userInput.trim()) return;
        setLoading(true);

        const newUserMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: userInput,
            timestamp: new Date(),
        };
        setChatHistory((prev) => [...prev, newUserMessage]);
        setUserInput("");

        try {
            setIsTyping(true);
            const response = await axios.post("/chat/completion", {
                message: userInput,
            });
            setIsTyping(false);
            const newAssistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.data.content,
                timestamp: new Date(),
            };
            setChatHistory((prev) => [...prev, newAssistantMessage]);
        } catch (error) {
            console.error("Error fetching chat completion:", error);
            setChatHistory((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "Sorry, I encountered an error. Please try again.",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    const handleEditMessage = (id: string) => {
        const messageToEdit = chatHistory.find((msg) => msg.id === id);
        if (messageToEdit) {
            setEditContent(messageToEdit.content); // Set the current content for editing
            setEditingMessageId(id); // Set the ID of the message being edited
            setChatHistory(
                chatHistory.map((msg) =>
                    msg.id === id ? { ...msg, isEditing: true } : msg,
                ),
            );
        }
    };

    const handleSaveEdit = () => {
        if (!editingMessageId) return; // Ensure we have an active message being edited

        setChatHistory(
            chatHistory.map((msg) =>
                msg.id === editingMessageId
                    ? { ...msg, content: editContent, isEditing: false }
                    : msg,
            ),
        );
        setEditContent(""); // Clear the edit content state
        setEditingMessageId(null); // Clear the editing state
    };

    const handleCancelEdit = () => {
        if (!editingMessageId) return;

        setChatHistory(
            chatHistory.map((msg) =>
                msg.id === editingMessageId
                    ? { ...msg, isEditing: false }
                    : msg,
            ),
        );
        setEditContent(""); // Clear the edit content state
        setEditingMessageId(null); // Clear the editing state
    };

    const handleDeleteMessage = (id: string) => {
        setChatHistory(chatHistory.filter((msg) => msg.id !== id));
    };

    const formatTimestamp = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen flex flex-col p-4 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Ask Away
            </h1>

            <div className="flex-grow overflow-auto mb-4 space-y-4">
                {chatHistory.map((message) => (
                    <div
                        key={message.id}
                        className={`max-w-3/4 ${
                            message.role === "user" ? "ml-auto" : "mr-auto"
                        }`}
                    >
                        <div
                            className={`p-3 rounded-lg ${
                                message.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
                            }`}
                        >
                            {message.isEditing ? (
                                <div className="flex flex-col space-y-2">
                                    <textarea
                                        value={editContent}
                                        onChange={(e) =>
                                            setEditContent(e.target.value)
                                        }
                                        className="w-full p-2 text-gray-900 bg-white rounded-md"
                                        rows={3}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p>{message.content}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs opacity-75">
                                            {formatTimestamp(message.timestamp)}
                                        </span>
                                        {message.role === "user" && (
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEditMessage(
                                                            message.id,
                                                        )
                                                    }
                                                    className="p-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteMessage(
                                                            message.id,
                                                        )
                                                    }
                                                    className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="max-w-3/4 mr-auto">
                        <div className="p-3 rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-gray-100">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="flex items-center space-x-2">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message here..."
                    rows={1}
                    className="flex-grow p-2 rounded-lg resize-none bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading || !userInput.trim()}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
                    ) : (
                        <Send className="w-6 h-6" />
                    )}
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </div>
    );
}
