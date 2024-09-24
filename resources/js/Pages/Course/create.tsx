import CourseCreate from "@/components/course-create";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

interface User {
    id: number;
    name: string;
    email: string;
    admin: boolean;
}

interface Auth {
    user: User;
}

interface CourseProps {
    auth: Auth;
    course_code: string;
}

export default function Course({ auth, course_code }: CourseProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Course
                </h2>
            }
        >
            <Head title="Create Course" />
            <CourseCreate />
        </AuthenticatedLayout>
    );
}
