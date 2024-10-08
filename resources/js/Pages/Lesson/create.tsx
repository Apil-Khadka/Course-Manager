import LessonCreate from "@/components/lesson-create";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function Lesson({
    auth,
    course_id,
}: PageProps<{ course_id: number }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Lesson
                </h2>
            }
        >
            <LessonCreate />
        </AuthenticatedLayout>
    );
}
