import React, { useState } from "react";
import { usePage, useForm, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowLeft } from "lucide-react";

interface PageProps {
    course_code: string;
    auth: {
        user: {
            id: number;
        };
    };
    [key: string]: any;
}

const CourseCreate: React.FC = () => {
    const { course_code, auth } = usePage<PageProps>().props;

    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        course_code: course_code, // Initialize with the generated course_code
        created_by: auth.user.id,
        updated_by: auth.user.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        {
            console.log("Data:", data);
        } // Debug line
        e.preventDefault();
        post(route("courses.store"), {
            onSuccess: () => {
                reset("title", "description");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
            onError: (errors) => {
                console.log("Errors:", errors); // Debug line
            },
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-blue-500 p-6">
                    <div className="flex justify-between items-center">
                        <Link
                            href={route("courses.index")}
                            className="text-white hover:text-gray-200 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <CardTitle className="text-2xl font-bold text-white">
                            Create New Course
                        </CardTitle>
                        <div className="w-6 h-6"></div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {showSuccess && (
                        <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md flex items-center">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Course created successfully!
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label
                                htmlFor="title"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Course Title
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
                                htmlFor="description"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Course Description
                            </Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                                rows={4}
                                required
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor="course_code"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Course Code (Auto-generated)
                            </Label>
                            <Input
                                id="course_code"
                                type="text"
                                value={data.course_code}
                                className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                                disabled
                            />
                            {errors.course_code && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.course_code}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between">
                            <Link
                                href={route("courses.index")}
                                className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors duration-200 py-2 px-4 rounded-md"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                            >
                                {processing ? "Creating..." : "Create Course"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseCreate;
