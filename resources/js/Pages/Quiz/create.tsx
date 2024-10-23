import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import QuizCreate from "@/components/quiz-create";
export default function Dashboard({
    auth,
    lesson_id,
}: PageProps<{ lesson_id: number }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Quiz Creation
                </h2>
            }
        >
            <Head title="Quiz create" />
            <QuizCreate />
        </AuthenticatedLayout>
    );
}
