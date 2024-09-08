import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface Course {
    id: number;
    title: string;
}

interface PageProps {
    courses: Course[];
    auth: {
        user: {
            id: number;
        };
    };
}

const LessonCreate: React.FC = () => {
    const { courses, auth } = usePage<PageProps>().props;
    const [showPreview, setShowPreview] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        video_url: "",
        course_id: "",
        created_by: auth.user.id,
        updated_by: auth.user.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("lessons.store"), {
            onSuccess: () => {
                reset("title", "content", "video_url", "course_id");
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
        <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Create New Lesson
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {showPreview ? (
                        <div className="space-y-4">
                            <div className="flex items-center text-green-600 dark:text-green-400">
                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                <p>Lesson created successfully!</p>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                {data.title}
                            </h2>
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: data.content,
                                }}
                            />
                            {data.video_url && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Video
                                    </h3>
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={data.video_url}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full rounded-lg"
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                            <Button
                                onClick={() => setShowPreview(false)}
                                className="mt-4"
                            >
                                Create Another Lesson
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="mt-1"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <ReactQuill
                                    theme="snow"
                                    value={data.content}
                                    onChange={(content) =>
                                        setData("content", content)
                                    }
                                    modules={modules}
                                    formats={formats}
                                    className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.content}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="video_url">
                                    Video URL (optional)
                                </Label>
                                <Input
                                    id="video_url"
                                    type="url"
                                    value={data.video_url}
                                    onChange={(e) =>
                                        setData("video_url", e.target.value)
                                    }
                                    className="mt-1"
                                />
                                {errors.video_url && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.video_url}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="course_id">Course</Label>
                                <select
                                    id="course_id"
                                    value={data.course_id}
                                    onChange={(e) =>
                                        setData("course_id", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    required
                                >
                                    <option value="">Select a course</option>
                                    {courses.map((course) => (
                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.course_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.course_id}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
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
