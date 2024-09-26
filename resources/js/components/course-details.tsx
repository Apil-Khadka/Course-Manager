import React from "react";
import { usePage, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Book, PlusCircle } from "lucide-react";
import { PageProps as InertiaPageProps } from "@/types";

interface Lesson {
    id: number;
    title: string;
    description: string;
    assigned_to: Assigned_to[];
}

interface Assigned_to {
    id: number;
    name: string;
    email: string;
    admin: boolean;
    course_id: number;
    user_id: number;
}

interface Course {
    id: number;
    title: string;
    description: string;
    course_code: string;
    created_by?: string;
    updated_by?: string;
    created_at: string;
    updated_at: string;
    lessons: Lesson[];
}

interface PageProps extends InertiaPageProps {
    course: {
        data: Course;
    };
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            admin: boolean;
        };
    };
}

const CourseDetails: React.FC = () => {
    const { course, auth } = usePage<PageProps>().props;
    const isAdmin = auth.user.admin;
    const courseData = course.data; // Accessing the actual course data
    const user_id = auth.user.id;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <Card className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {courseData.title}
                    </CardTitle>
                    {isAdmin ? (
                        <div className="space-x-2">
                            <Link href={route("courses.edit", courseData.id)}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                            <Link
                                href={route("courses.destroy", courseData.id)}
                                method="delete"
                                as="button"
                            >
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="flex items-center"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    ) : null}
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                Course Details
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                <strong>Course Code:</strong>{" "}
                                {courseData.course_code}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                <strong>Description:</strong>{" "}
                                {courseData.description}
                            </p>
                            {/* {isAdmin ? (
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong>Assigned To:</strong>{" "}
                                    {courseData.assigned_to.length > 0 ? (
                                        courseData.assigned_to.map(
                                            (assigned_to) => (
                                                <div
                                                    key={assigned_to.id}
                                                    style={{
                                                        marginBottom: "8px",
                                                    }}
                                                >
                                                    <span>
                                                        <Link
                                                            href={route(
                                                                "user.data",
                                                                assigned_to.id,
                                                            )}
                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            {assigned_to.name}{" "}
                                                        </Link>
                                                    </span>
                                                    (
                                                    <a
                                                        className="text-black-800 hover:underline hover:text-blue-400"
                                                        href={`mailto:${assigned_to.email}`}
                                                    >
                                                        {assigned_to.email}
                                                    </a>
                                                    )
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <p>Not assigned to any user</p>
                                    )}
                                </p>
                            ) : null} */}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                Additional Information
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                <strong>Created At:</strong>{" "}
                                {formatDate(courseData.created_at)}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                <strong>Updated At:</strong>{" "}
                                {formatDate(courseData.updated_at)}
                            </p>
                            {isAdmin ? (
                                <>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <strong>Created By:</strong>{" "}
                                        {courseData.created_by}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <strong>Updated By:</strong>{" "}
                                        {courseData.updated_by}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Lessons
                            </h3>
                            {isAdmin ? (
                                <Link
                                    href={route("lessons.create")}
                                    data={{ course_id: courseData.id }}
                                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                                >
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                    Create lesson
                                </Link>
                            ) : null}
                        </div>
                        {courseData.lessons.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {courseData.lessons.map((lesson) => (
                                    <Card
                                        key={lesson.id}
                                        className="bg-gray-50 dark:bg-gray-700"
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                {lesson.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {lesson.description}
                                            </p>
                                            <Link
                                                href={route(
                                                    "lessons.show",
                                                    lesson.id,
                                                )}
                                                className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                <Book className="w-4 h-4 mr-1" />
                                                View Lesson
                                            </Link>
                                            {lesson.assigned_to.some(
                                                (assigned) =>
                                                    assigned.user_id ===
                                                    user_id,
                                            ) ? (
                                                <span className="text-green-500">
                                                    Assigned
                                                </span>
                                            ) : (
                                                <Link
                                                    href={route(
                                                        "assign.lessons",
                                                        lesson.id,
                                                    )}
                                                    method="post"
                                                    as="button"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center"
                                                    >
                                                        Assign Lesson
                                                    </Button>
                                                </Link>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                                No lessons available for this course.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseDetails;
