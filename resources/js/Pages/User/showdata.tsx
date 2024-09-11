import { UserData } from "@/components/UserDataCL";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head } from "@inertiajs/react";

export default function (authis: { user: User; auth: any; userData: any }) {
    console.log("Auth:", authis);
    const { auth, userData } = authis;
    console.log("UserData:", userData);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User data
                </h2>
            }
        >
            <Head title="UserData" />
            <UserData />
        </AuthenticatedLayout>
    );
}
