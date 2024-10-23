import { useForm } from "@inertiajs/react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdminToggleProps {
    isAdmin: boolean;
}

export default function AdminToggle({ isAdmin }: AdminToggleProps) {
    const { data, setData, patch, processing } = useForm({
        admin: isAdmin,
    });
    const [isPending, setIsPending] = useState(false);

    const handleToggle = () => {
        setIsPending(true);
        setData("admin", !data.admin);
        patch(route("profile.toggle"), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log("Admin status updated successfully!");
                setIsPending(false);
            },
            onError: (errors) => {
                console.error("Error updating admin status:", errors);
                setIsPending(false);
            },
        });
    };

    return (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
                <Switch
                    id="admin-toggle"
                    checked={data.admin}
                    onCheckedChange={handleToggle}
                    disabled={processing || isPending}
                />
                <label
                    htmlFor="admin-toggle"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Admin
                </label>
            </div>
            <Button
                onClick={handleToggle}
                disabled={processing || isPending}
                variant={data.admin ? "destructive" : "default"}
                className="w-full sm:w-auto"
            >
                {processing || isPending ? (
                    <span className="inline-flex items-center">
                        <svg
                            className="w-4 h-4 mr-2 animate-spin"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Processing...
                    </span>
                ) : data.admin ? (
                    "Revoke Admin"
                ) : (
                    "Make Admin"
                )}
            </Button>
        </div>
    );
}
