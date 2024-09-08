import CourseList from "@/components/course-list";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Course({ auth, courses }: PageProps<{ courses: any }>) {
    console.log("Auth:", auth);
    console.log("Courses:", courses);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Courses
                </h2>
            }
        >
            <Head title="Course" />
            <CourseList />
        </AuthenticatedLayout>
    );
}
