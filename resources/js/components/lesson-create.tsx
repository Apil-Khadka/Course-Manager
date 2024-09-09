import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Video } from "lucide-react";

// Interfaces

interface PageProps {
    courses: any;
    course_id: number;
    auth: {
        user: {
            id: number;
        };
    };
    [key: string]: any;
}

// Custom formatting functions
// const LessonCreate: React.FC<PageProps> = ({ auth, course_id }) => {
const LessonCreate: React.FC = () => {
    const { course_id, auth } = usePage<PageProps>().props;
    const [showPreview, setShowPreview] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        video_url: "",
        course_id: course_id,
        created_by: auth.user.id,
        updated_by: auth.user.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("lessons.store"), {
            onSuccess: () => {
                reset("title", "content", "video_url");
                setShowPreview(true);
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
                    <CardTitle className="text-3xl font-bold text-white">
                        Create New Lesson
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {showPreview ? (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center text-green-600 dark:text-green-400">
                                <CheckCircle2 className="w-6 h-6 mr-2" />
                                <p className="text-lg">
                                    Lesson created successfully!
                                </p>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                {data.title}
                            </h2>
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: data.content,
                                }}
                            />
                            {data.video_url && (
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                        <Video className="w-5 h-5 mr-2" />
                                        Video Content
                                    </h3>
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={data.video_url}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full rounded-lg shadow-md"
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                            <Button
                                onClick={() => setShowPreview(false)}
                                className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                            >
                                Create Another Lesson
                            </Button>
                        </div>
                    ) : (
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

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                            >
                                Create Lesson
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default LessonCreate;
