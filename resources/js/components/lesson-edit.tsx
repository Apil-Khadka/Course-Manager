import React, { useState } from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Video, ArrowLeft } from "lucide-react";

interface Lesson {
    data: {
        id: number;
        title: string;
        content: string;
        video_url: string | null;
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

const LessonEdit: React.FC = () => {
    const { lessons, auth } = usePage<PageProps>().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const lesson = lessons.data;

    const { data, setData, put, processing, errors } = useForm({
        title: lesson.title,
        content: lesson.content,
        video_url: lesson.video_url || "",
        course_id: lesson.course_id,
        updated_by: auth.user.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("lessons.update", lesson.id), {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    return (
        <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-all duration-300">
            <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                    <div className="flex justify-between items-center">
                        <Link
                            href={route("lessons.show", lesson.id)}
                            className="text-white hover:text-gray-200 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <CardTitle className="text-3xl font-bold text-white">
                            Edit Lesson
                        </CardTitle>
                        <div className="w-6 h-6"></div>{" "}
                        {/* Spacer for alignment */}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {showSuccess && (
                        <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md flex items-center">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Lesson updated successfully!
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label
                                htmlFor="title"
                                className="text-lg text-gray-700 dark:text-gray-300"
                            >
                                Lesson Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                                required
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor="content"
                                className="text-lg text-gray-700 dark:text-gray-300"
                            >
                                Lesson Content
                            </Label>
                            <div className="mt-1 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                                <ReactQuill
                                    theme="snow"
                                    value={data.content}
                                    onChange={(content) =>
                                        setData("content", content)
                                    }
                                    modules={modules}
                                    formats={formats}
                                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
                                />
                            </div>
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor="video_url"
                                className="text-lg text-gray-700 dark:text-gray-300"
                            >
                                Video URL (optional)
                            </Label>
                            <Input
                                id="video_url"
                                type="url"
                                value={data.video_url}
                                onChange={(e) =>
                                    setData("video_url", e.target.value)
                                }
                                className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                            />
                            {errors.video_url && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.video_url}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <Link
                                href={route("lessons.show", lesson.id)}
                                className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors duration-200 py-2 px-4 rounded-md"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                            >
                                Update Lesson
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LessonEdit;
