import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import MyPagination from "./my-pagination";
import { PageProps as InertiaPageProps } from "@/types";
// Define types for our data structure
interface Course {
    id: number;
    title: string;
    description: string;
    // Add other course properties as needed
}

interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}
interface User {
    id: number;
    name: string;
    email: string;
    admin: boolean; // Add this line to include the admin property
    // other properties...
}
interface CoursesData {
    data: Course[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

interface PageProps extends InertiaPageProps {
    courses: CoursesData;
    auth: {
        user: User;
    };
}

// CourseCard component
const CourseCard: React.FC<{ course: Course; isAdmin: boolean }> = ({
    course,
    isAdmin,
}) => (
    <Card className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200 hover:shadow-xl">
        <Link href={route("courses.show", course.id)} className="block h-full">
            <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-100">
                    {course.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {course.description}
                </p>
            </CardContent>
        </Link>
        {isAdmin && (
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2">
                <Link
                    href={route("courses.edit", course.id)}
                    as="button"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    <Edit className="w-5 h-5" />
                </Link>
                <Link
                    href={route("courses.destroy", course.id)}
                    method="delete"
                    as="button"
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                    <Trash2 className="w-5 h-5" />
                </Link>
            </div>
        )}
    </Card>
);

// CourseList component
const CourseList: React.FC = () => {
    const { courses, auth } = usePage<PageProps>().props;
    const isAdmin = auth.user.admin;

    console.log(courses);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Courses
                </h1>
                {isAdmin && (
                    <Link
                        href={route("courses.create")}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create Course
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.data.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
            <div className="mt-8">
                <MyPagination
                    currentPage={courses.meta.current_page}
                    totalPages={courses.meta.last_page}
                    onPageChange={(page) => {
                        // Use Inertia to navigate to the new page
                        // You might need to adjust this based on your route structure
                        window.location.href = `${courses.meta.path}?page=${page}`;
                    }}
                />
            </div>
        </div>
    );
};

export default CourseList;
