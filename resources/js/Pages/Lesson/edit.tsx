import LessonEdit from "@/components/lesson-edit";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Course({ auth, lessons }: PageProps<{ lessons: any }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {lessons.data.title}
                </h2>
            }
        >
            <Head title="Edit Lesson" />
            <LessonEdit />
        </AuthenticatedLayout>
    );
}
