import { QuizShow } from "@/components/quiz-show";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
export default function Dashboard({ auth, Quiz }: PageProps<{ Quiz: any }>) {
    console.log("Quiz", Quiz);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Quiz
                </h2>
            }
        >
            <Head title="Take Quiz" />
            <QuizShow />
        </AuthenticatedLayout>
    );
}
