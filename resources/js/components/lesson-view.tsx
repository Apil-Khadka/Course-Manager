import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, Clock, Calendar } from "lucide-react";
import DeleteButton from "./delete-button";

interface Lesson {
    data: {
        id: number;
        title: string;
        content: string;
        created_by: string;
        updated_by: string;
        video_url: string | null;
        created_at: string;
        updated_at: string;
        course_id: number;
    };
}

interface PageProps {
    lessons: Lesson;
    auth: {
        user: {
            id: number;
            admin: boolean;
        };
    };
    [key: string]: any;
}

export default function LessonView() {
    const { lessons, auth } = usePage<PageProps>().props;
    const lesson = lessons.data;
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
            <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <div className="flex justify-between items-center">
                        <Link
                            href={route("courses.show", lesson.course_id)}
                            className="text-white bg-gradient-to-br hover:text-gray-200 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <CardTitle className="text-3xl font-bold text-white text-center flex-grow">
                            {lesson.title}
                        </CardTitle>
                        {auth.user.admin ? (
                            <div className="flex space-x-2">
                                <Link
                                    href={route("lessons.edit", lesson.id)}
                                    className="text-gray hover:text-gray-200 transition-colors duration-200"
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-black border-white hover:bg-white/10"
                                    >
                                        Edit Lesson
                                    </Button>
                                </Link>
                                <DeleteButton
                                    route={route("lessons.destroy", lesson.id)}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>
                                Created: {formatDate(lesson.created_at)}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                                Updated: {formatDate(lesson.updated_at)}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                            <span>Created by: {lesson.created_by}</span>
                        </div>
                        <div className="flex items-center">
                            <span>Updated by: {lesson.updated_by}</span>
                        </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <div
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />
                    </div>

                    {lesson.video_url && (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                                <Video className="w-5 h-5 mr-2" />
                                Video Content
                            </h3>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={lesson.video_url}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg shadow-md"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center mt-8">
                        <Link
                            href={route("quiz.show", lesson.id)}
                            className="w-full sm:w-auto"
                        >
                            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                Take Quiz
                            </Button>
                        </Link>
                        {auth.user.admin ? (
                            <Link
                                href={route("quiz.create", lesson.id)}
                                className="w-full sm:w-auto"
                            >
                                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                    Create Quiz
                                </Button>
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
