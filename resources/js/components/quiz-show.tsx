import React, { useState, useEffect } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PageProps as EPageProps } from "@/types";
import { ArrowLeft } from "lucide-react";

// Interfaces
interface Option {
    id: number;
    title: string;
}

interface Question {
    id: number;
    title: string;
    options: Option[];
}

interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: Question[];
    lesson_id: number;
}
interface User {
    id: number;
}
interface PageProps extends EPageProps {
    Quiz: { data: Quiz[] };
    user: User;
}

interface QuestionCardProps {
    question: Question;
    attempts: number;
    onSubmit: (optionId: number) => void;
    onNext: () => void;
    showAnswer: boolean;
    showSkip: boolean;
    description: string | null;
}

export function QuizShow() {
    const { Quiz, auth } = usePage<PageProps>().props;
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [attempts, setAttempts] = useState<Record<number, number>>({});
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [description, setDescription] = useState<string | null>(null);
    const [showSkip, setShowSkip] = useState(false);

    const currentQuiz = Quiz.data[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    useEffect(() => {
        if (completedQuestions.length === currentQuiz.questions.length) {
            setQuizCompleted(true);
            axios.post(route("quiz.complete"), {
                quiz_id: currentQuiz.id,
                user_id: auth.user.id,
            });
        }
    }, [completedQuestions]);

    useEffect(() => setShowSkip(false), [currentQuestionIndex]);

    const handleSubmit = async (optionId: number) => {
        try {
            const { data } = await axios.post(route("quiz.submit-answer"), {
                quiz_id: currentQuiz.id,
                question_id: currentQuestion.id,
                option_id: optionId,
            });
            {
                console.log("Data:", data);
            } // Debug line
            if (data.success) {
                setCompletedQuestions((prev) => [...prev, currentQuestion.id]);
                setDescription(data.description || null);
            } else {
                incrementAttempt();
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    const incrementAttempt = () => {
        setAttempts((prev) => ({
            ...prev,
            [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1,
        }));
        if (attempts[currentQuestion.id] + 1 >= 3) setShowSkip(true);
    };

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < currentQuiz.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else if (currentQuizIndex < Quiz.data.length - 1) {
            setCurrentQuizIndex((prev) => prev + 1);
            setCurrentQuestionIndex(0);
        } else {
            setQuizCompleted(true);
        }
        setDescription(null);
    };

    if (quizCompleted)
        return <QuizCompletionCard lessonId={currentQuiz.lesson_id} />;

    return (
        <div className="w-full max-w-4xl mx-auto my-8 space-y-6">
            <Link
                href={route("lessons.show", currentQuiz.lesson_id)}
                className="text-white bg-gradient-to-br hover:text-gray-200 transition-colors duration-200"
            >
                <ArrowLeft className="w-6 h-6 text-green-200 bg-gradient-to-br hover:text-green-800" />
            </Link>

            <QuizHeader
                title={currentQuiz.title}
                description={currentQuiz.description}
                progress={
                    (completedQuestions.length / currentQuiz.questions.length) *
                    100
                }
            />
            <QuestionCard
                question={currentQuestion}
                attempts={attempts[currentQuestion.id] || 0}
                onSubmit={handleSubmit}
                onNext={moveToNextQuestion}
                showSkip={showSkip}
                showAnswer={completedQuestions.includes(currentQuestion.id)}
                description={description}
            />
        </div>
    );
}

function QuizHeader({
    title,
    description,
    progress,
}: {
    title: string;
    description: string;
    progress: number;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-primary">
                    {title}
                </CardTitle>
                <CardDescription className="text-center text-1xl  text-primary">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="w-full" />
                <p className="text-center text-muted-foreground mt-2">
                    Progress: {progress.toFixed(0)}%
                </p>
            </CardContent>
        </Card>
    );
}

function QuestionCard({
    question,
    attempts,
    onSubmit,
    onNext,
    showAnswer,
    showSkip,
    description,
}: QuestionCardProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleSubmit = () =>
        selectedOption !== null && onSubmit(selectedOption);

    useEffect(() => {
        setSelectedOption(null);
    }, [question]);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                    {question.title}
                </h2>
                <RadioGroup
                    onValueChange={(value) => setSelectedOption(Number(value))}
                    className="space-y-3"
                    disabled={showAnswer}
                >
                    {question.options.map((option) => (
                        <div
                            key={option.id}
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                        >
                            <RadioGroupItem
                                value={option.id.toString()}
                                id={`option-${option.id}`}
                            />
                            <Label
                                htmlFor={`option-${option.id}`}
                                className="flex-grow cursor-pointer"
                            >
                                {option.title}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
                <div className="mt-6 space-y-4">
                    {!showAnswer && (
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedOption === null}
                            className="w-full"
                        >
                            Submit
                        </Button>
                    )}
                    {showSkip && !showAnswer && (
                        <Button
                            onClick={onNext}
                            variant="outline"
                            className="w-full"
                        >
                            Skip
                        </Button>
                    )}
                    {showAnswer && (
                        <div className="p-4 bg-muted rounded-md">
                            <h3 className="font-semibold text-lg mb-2">
                                Correct Answer:
                            </h3>
                            <p className="text-muted-foreground">
                                {description || "No description available."}
                            </p>
                        </div>
                    )}
                    {showAnswer && (
                        <Button onClick={onNext} className="w-full">
                            Next Question
                        </Button>
                    )}
                    {attempts > 0 && !showAnswer && (
                        <p className="text-destructive text-center">
                            Incorrect. Try again!
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function QuizCompletionCard({ lessonId }: { lessonId: number }) {
    const handleReturn = () => router.visit(`/lessons/${lessonId}`);

    return (
        <Card className="w-full max-w-md mx-auto my-8">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-green-600 dark:text-green-400">
                    Quiz Completed!
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="mb-4">
                    Congratulations! You've completed the quiz.
                </p>
                <Button onClick={handleReturn}>Return to Lesson</Button>
            </CardContent>
        </Card>
    );
}
