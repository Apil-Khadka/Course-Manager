import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, usePage } from "@inertiajs/react";
import { PlusCircle, Trash2, CircleMinus, ArrowLeft } from "lucide-react";

interface Option {
    title: string;
    description: string;
    correct: boolean;
}

interface Question {
    title: string;
    options: Option[];
}

interface QuizData {
    title: string;
    description: string;
    lesson_id: number;
    questions: Question[];
}

export default function Component() {
    const { auth, lesson_id } = usePage<{ lesson_id: number }>().props;
    const [quiz, setQuiz] = useState<QuizData>({
        title: "",
        description: "",
        lesson_id: lesson_id,
        questions: [],
    });
    const [response, setResponse] = useState("");

    const handleQuizChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setQuiz((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addQuestion = () => {
        setQuiz((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    title: "",
                    options: [{ title: "", description: "", correct: false }],
                },
            ],
        }));
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = quiz.questions.filter(
            (_, qIndex) => qIndex !== index,
        );
        setQuiz((prev) => ({ ...prev, questions: updatedQuestions }));
    };

    const handleQuestionChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
        setQuiz((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    const addOption = (questionIndex: number) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].options.push({
            title: "",
            description: "",
            correct: false,
        });
        setQuiz((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    const removeOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].options = updatedQuestions[
            questionIndex
        ].options.filter((_, oIndex) => oIndex !== optionIndex);
        setQuiz((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    const handleOptionChange = (
        questionIndex: number,
        optionIndex: number,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value, type, checked } = e.target;
        const updatedQuestions = [...quiz.questions];
        if (name === "correct" && checked) {
            updatedQuestions[questionIndex].options.forEach((option, index) => {
                option.correct = index === optionIndex;
            });
        } else {
            updatedQuestions[questionIndex].options[optionIndex] = {
                ...updatedQuestions[questionIndex].options[optionIndex],
                [name]: type === "checkbox" ? checked : value,
            };
        }
        setQuiz((prev) => ({
            ...prev,
            questions: updatedQuestions,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(route("quiz.store"), {
                title: quiz.title,
                description: quiz.description,
                lesson_id: quiz.lesson_id,
                questions: quiz.questions.map((q) => ({
                    title: q.title,
                    options: q.options.map((opt) => ({
                        title: opt.title,
                        correct: opt.correct,
                    })),
                })),
            });
            setResponse("Quiz created successfully");
        } catch (error) {
            setResponse("An error occurred while creating the quiz");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                <div className="px-6 py-8 sm:p-10">
                    <div className="flex items-center justify-evenly mb-8">
                        <Link
                            href={route("lessons.show", quiz.lesson_id)}
                            className="inline-flex items-center text-white bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:to-green-700 transition-colors duration-300 ease-in-out rounded-md px-4 py-2 shadow-md"
                        >
                            <ArrowLeft className="w-6 h-6 mr-2" />
                            Back to Lesson
                        </Link>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Create a New Quiz
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={quiz.title}
                                onChange={handleQuizChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                value={quiz.description}
                                onChange={handleQuizChange}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Questions
                                </h2>
                                <Button
                                    type="button"
                                    onClick={addQuestion}
                                    className="inline-flex items-center px-4 py-2 text-sm"
                                >
                                    <PlusCircle className="h-5 w-5 mr-2" />
                                    Add Question
                                </Button>
                            </div>
                            {quiz.questions.map((question, qIndex) => (
                                <div
                                    key={qIndex}
                                    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Question {qIndex + 1}
                                        </h3>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                removeQuestion(qIndex)
                                            }
                                            variant="destructive"
                                            size="sm"
                                            className="inline-flex items-center"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Remove
                                        </Button>
                                    </div>

                                    <div className="mb-4">
                                        <Input
                                            type="text"
                                            name="title"
                                            value={question.title}
                                            onChange={(e) =>
                                                handleQuestionChange(qIndex, e)
                                            }
                                            required
                                            placeholder="Question title"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
                                                Options
                                            </h4>
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    addOption(qIndex)
                                                }
                                                variant="outline"
                                                size="sm"
                                                className="inline-flex items-center"
                                            >
                                                <PlusCircle className="h-4 w-4 mr-2" />
                                                Add Option
                                            </Button>
                                        </div>
                                        {question.options.map(
                                            (option, oIndex) => (
                                                <div
                                                    key={oIndex}
                                                    className="bg-white dark:bg-gray-600 p-4 rounded-md shadow-sm"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Input
                                                            type="text"
                                                            name="title"
                                                            value={option.title}
                                                            onChange={(e) =>
                                                                handleOptionChange(
                                                                    qIndex,
                                                                    oIndex,
                                                                    e,
                                                                )
                                                            }
                                                            required
                                                            placeholder="Option title"
                                                            className="flex-grow mr-4"
                                                        />
                                                        <div className="flex items-center space-x-4">
                                                            <label className="inline-flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="correct"
                                                                    checked={
                                                                        option.correct
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleOptionChange(
                                                                            qIndex,
                                                                            oIndex,
                                                                            e,
                                                                        )
                                                                    }
                                                                    className="form-checkbox h-5 w-5 text-primary"
                                                                />
                                                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                                                    Correct
                                                                </span>
                                                            </label>
                                                            <Button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeOption(
                                                                        qIndex,
                                                                        oIndex,
                                                                    )
                                                                }
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {option.correct && (
                                                        <Input
                                                            type="text"
                                                            name="description"
                                                            value={
                                                                option.description
                                                            }
                                                            onChange={(e) =>
                                                                handleOptionChange(
                                                                    qIndex,
                                                                    oIndex,
                                                                    e,
                                                                )
                                                            }
                                                            placeholder="Option description (for correct answer)"
                                                            className="mt-2 w-full"
                                                        />
                                                    )}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-5">
                            {response && (
                                <p className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
                                    {response}
                                </p>
                            )}
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center"
                                >
                                    Create Quiz
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
