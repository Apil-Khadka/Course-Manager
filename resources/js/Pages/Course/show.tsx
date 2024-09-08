import CourseDetails from "@/components/course-details";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Course({ auth, course }: PageProps<{ course: any }>) {
    console.log("Auth:", auth);
    console.log("Courses:", course);

    return (
        <AuthenticatedLayout user={auth.user} header={<h2>Course Detail</h2>}>
            <Head title={course.data.title} />
            <CourseDetails />
        </AuthenticatedLayout>
    );
}
