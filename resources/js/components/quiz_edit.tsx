import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { ArrowLeft, Trash2 } from "lucide-react";

interface Option {
    id: number;
    title: string;
    correct: boolean;
    description?: string;
    question_id: number;
}

interface Question {
    id: number;
    title: string;
    quiz_id: number;
    options: Option[];
}

interface Quiz {
    id: number;
    title: string;
    description: string;
    lesson_id: number;
    questions: Question[];
}

export default function Component() {
    const { quiz } = usePage<{ quiz: Quiz }>().props;
    const [quizData, setQuizData] = useState<Quiz>({
        title: quiz.title,
        lesson_id: quiz.lesson_id,
        description: quiz.description,
        id: quiz.id,
        questions: quiz.questions.map((question) => ({
            id: question.id,
            quiz_id: question.quiz_id,
            title: question.title,
            options: question.options,
        })),
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuizData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuestionChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        const updatedQuestions = quizData.questions.map((question, i) =>
            i === index ? { ...question, title: e.target.value } : question,
        );
        setQuizData((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    const handleOptionChange = (
        questionIndex: number,
        optionIndex: number,
        field: keyof Option,
        value: string | boolean | number,
    ) => {
        const updatedQuestions = quizData.questions.map((question, i) =>
            i === questionIndex
                ? {
                      ...question,
                      options: question.options.map((option, j) =>
                          j === optionIndex
                              ? { ...option, [field]: value }
                              : option,
                      ),
                  }
                : question,
        );
        if (field === "correct" && value === true) {
            updatedQuestions[questionIndex].options.forEach((option, i) => {
                if (i !== optionIndex) {
                    option.correct = false;
                    option.description = "";
                }
            });
        }
        setQuizData((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    const validateQuizData = () => {
        for (let question of quizData.questions) {
            if (!question.title.trim()) {
                setErrorMessage("All questions must have a title.");
                return false;
            }
            const hasCorrectOption = question.options.some(
                (option) => option.correct,
            );
            if (!hasCorrectOption) {
                setErrorMessage(
                    "Each question must have at least one correct option.",
                );
                return false;
            }
        }
        setErrorMessage(null);
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateQuizData()) return;

        try {
            await axios.put(route("quiz.update", quiz.id), quizData);
            // Handle success (e.g., redirect to another page)
            setErrorMessage("Quiz Updaed Successfully");
        } catch (error) {
            console.log("Error", error);
            setErrorMessage("Failed to update quiz. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href={route("lessons.show", quiz.lesson_id)}
                    className="inline-flex items-center text-white bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:to-green-700 transition-colors duration-300 ease-in-out rounded-md px-4 py-2 shadow-md"
                >
                    <ArrowLeft className="w-6 h-6 mr-2" />
                    Back to Lesson
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Edit Quiz
                </h1>
                <Link
                    href={route("quiz.destroy", quiz.id)}
                    method="delete"
                    as="button"
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                >
                    <Trash2 className="w-5 h-5" />
                </Link>
            </div>

            {errorMessage && (
                <div className="text-white-600 dark:text-blue-400 mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-md">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Quiz Title
                    </label>
                    <Input
                        id="title"
                        name="title"
                        value={quizData.title}
                        onChange={handleChange}
                        placeholder="Quiz Title"
                        className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Quiz Description
                    </label>
                    <Input
                        id="description"
                        name="description"
                        value={quizData.description}
                        onChange={handleChange}
                        placeholder="Quiz Description"
                        className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                {quizData.questions.map((question, questionIndex) => (
                    <div
                        key={question.id}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm"
                    >
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                            Question {questionIndex + 1}
                        </h3>
                        <Input
                            value={question.title}
                            onChange={(e) =>
                                handleQuestionChange(questionIndex, e)
                            }
                            placeholder="Question Title"
                            className="mb-4 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        />
                        <div className="space-y-4">
                            {question.options.map((option, optionIndex) => (
                                <div
                                    key={option.id}
                                    className="flex flex-col space-y-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            value={option.title}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    questionIndex,
                                                    optionIndex,
                                                    "title",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Option Title"
                                            className="flex-grow bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                                        />
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={option.correct}
                                                onChange={(e) =>
                                                    handleOptionChange(
                                                        questionIndex,
                                                        optionIndex,
                                                        "correct",
                                                        e.target.checked,
                                                    )
                                                }
                                                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                                Correct
                                            </span>
                                        </label>
                                    </div>
                                    {option.correct ? (
                                        <Input
                                            type="text"
                                            value={option.description || ""}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    questionIndex,
                                                    optionIndex,
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Description (for correct answer)"
                                            className="w-full bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
}
