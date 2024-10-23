import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BookOpen, PenTool, Users } from "lucide-react";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

export default function FrontPage({
    auth,
}: PageProps<{ auth: { user: any } }>) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <PenTool className="h-6 w-6" />
                    <span className="ml-2 text-lg font-bold">
                        CourseCreator
                    </span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    {/* <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                        Features
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                        Pricing
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                        About
                    </Link> */}
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="rounded-md px-3 py-2 text-sm font-medium text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="rounded-md px-3 py-2 text-sm font-medium text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="rounded-md px-3 py-2 text-sm font-medium text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Create and Manage Your Courses with Ease
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    CourseCreator empowers educators to build,
                                    organize, and share knowledge through
                                    customized online courses.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button asChild>
                                    <Link href={route("register")}>
                                        Get Started
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="#">
                                        Freely toogle between Admin and Regular
                                        user in this trial phase
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Platform Features
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Creation</CardTitle>
                                    <CardDescription>
                                        Design your curriculum with ease
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Our intuitive tools allow you to create
                                        engaging lessons, quizzes, and
                                        assignments tailored to your teaching
                                        style.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quiz Creation</CardTitle>
                                    <CardDescription>
                                        Effortlessly create quizes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Add Interactive Quizes , which can be
                                        created ,edited with ease
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Chat Bot</CardTitle>
                                    <CardDescription>
                                        Chat with ai regrading your courses{" "}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Gain information about your courses</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Why Choose CourseCreator?
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                                <PenTool className="h-10 w-10 text-primary" />
                                <h3 className="text-xl font-bold">
                                    Customizable Courses
                                </h3>
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Create courses that reflect your unique
                                    teaching style and expertise.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                                <Users className="h-10 w-10 text-primary" />
                                <h3 className="text-xl font-bold">
                                    Seamless Collaboration
                                </h3>
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Easily collaborate with other educators or
                                    teaching assistants on course development.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                                <BookOpen className="h-10 w-10 text-primary" />
                                <h3 className="text-xl font-bold">
                                    Flexible Learning
                                </h3>
                                <p className="text-center text-gray-500 dark:text-gray-400">
                                    Offer self-paced or scheduled courses to
                                    accommodate various learning styles.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Start Creating Your Courses Today
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Join educators worldwide who are already
                                    using CourseCreator to share their knowledge
                                    and skills.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route("register")}>
                                        Sign Up Now
                                    </Link>
                                </Button>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    No credit card required. Start with our free
                                    plan today.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 CourseCreator. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Privacy Policy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
