import { usePage, useForm, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { PageProps as EPageProps } from "@/types";
import { useState } from "react";

interface Course {
    id: number;
    title: string;
    description: string;
    course_code: string;
    created_by?: string;
    updated_by?: string;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    admin: boolean;
}

interface PageProps extends EPageProps {
    course: {
        data: Course;
    };
    auth: {
        user: User;
    };
}

const CourseEdit: React.FC = () => {
    const { course, auth } = usePage<PageProps>().props;
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        title: course.data.title, // Update the reference to course.data
        description: course.data.description, // Update the reference to course.data
        updated_by: auth.user.id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("courses.update", course.data.id), {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-blue-500 p-6">
                    <div className="flex justify-between items-center">
                        <Link
                            href={route("courses.show", course.data.id)}
                            className="text-white hover:text-gray-200 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <CardTitle className="text-2xl font-bold text-white">
                            Edit Course
                        </CardTitle>
                        <div className="w-6 h-6"></div>{" "}
                        {/* Spacer for alignment */}
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {showSuccess && (
                        <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md flex items-center">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Course updated successfully!
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

                        <div className="flex justify-between">
                            <Link
                                href={route("courses.show", course.data.id)}
                                className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors duration-200 py-2 px-4 rounded-md"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                            >
                                {processing ? "Updating..." : "Update Course"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseEdit;
