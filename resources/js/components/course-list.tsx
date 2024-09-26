import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import MyPagination from "./my-pagination";
import {
    PageProps as InertiaPageProps,
    Course,
    User,
    CourseData,
} from "@/types";
import axios from "axios";

interface PageProps extends InertiaPageProps {
    courses: CourseData;
    auth: {
        user: User;
    };
}

// CourseCard component
const CourseCard: React.FC<{
    course: Course;
    isAdmin: boolean;
    user_id: number;
}> = ({ course, isAdmin, user_id }) => (
    <Card className="w-full max-w-sm bg-white pb-10 dark:bg-gray-800 shadow-lg transition-colors duration-200 hover:shadow-xl">
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
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2">
            {course.assigned_to.some(
                (assigned) => assigned.user_id === user_id,
            ) ? (
                <span className="text-green-500">Assigned</span>
            ) : (
                <Link
                    href={route("assign.courses", course.id)}
                    method="post"
                    as="button"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                    >
                        Assign Course
                    </Button>
                </Link>
            )}
            {isAdmin ? (
                <>
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
                    </Link>{" "}
                </>
            ) : null}
        </div>
    </Card>
);

// CourseList component
const CourseList: React.FC = () => {
    const { auth, courses } = usePage<PageProps>().props;

    const isAdmin = auth.user.admin;
    const user_id = auth.user.id;

    console.log("Courses:", courses);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Courses
                </h1>
                {isAdmin ? (
                    <Link
                        href={route("courses.create")}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create Course
                    </Link>
                ) : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses ? (
                    courses.data.length > 0 ? ( // Check if there are courses
                        courses.data.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                isAdmin={isAdmin}
                                user_id={user_id}
                            />
                        ))
                    ) : (
                        <span>No courses found</span> // If no courses exist
                    )
                ) : (
                    <span>Loading courses...</span> // Optional: loading state while fetching
                )}
            </div>
            <div className="mt-8">
                <MyPagination
                    currentPage={courses.meta.current_page}
                    totalPages={courses.meta.last_page}
                    onPageChange={(page) => {
                        window.location.href = `${courses.meta.path}?page=${page}`;
                    }}
                />
            </div>
        </div>
    );
};

export default CourseList;
