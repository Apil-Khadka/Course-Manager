import React from "react";
import { usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    AlertCircle,
    BookOpen,
    GraduationCap,
    User,
    Video,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { PageProps as InertiaPageProps } from "@/types";

interface Lesson {
    id: number;
    title: string;
    content: string;
    video_url: string | null;
}

interface User {
    id: number;
    name: string;
    email: string;
    admin: boolean;
}

interface Course {
    id: number;
    title: string;
    description: string;
    course_code: string;
    lessons: Lesson[];
}

interface UserData {
    id: number;
    name: string;
    email: string;
    admin: number;
    courses: Course[];
}

interface PageProps extends InertiaPageProps {
    userData: UserData;
    user: User;
}

export function UserData() {
    const { userData } = usePage<PageProps>().props;

    if (!userData) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>User data not found.</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <User className="mr-2" />
                        User Profile
                    </CardTitle>
                    <CardDescription>
                        Details for {userData.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium">Name:</p>
                            <p>{userData.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Email:</p>
                            <p>{userData.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Admin Status:</p>
                            <p>{userData.admin ? "Admin" : "Regular User"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <BookOpen className="mr-2" />
                        Enrolled Courses and Lessons
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {userData.courses.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full">
                            {userData.courses.map((course) => (
                                <AccordionItem
                                    key={course.id}
                                    value={`course-${course.id}`}
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center">
                                            <GraduationCap className="mr-2" />
                                            <span>{course.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="mb-4">
                                            <p className="text-sm font-medium">
                                                Description:
                                            </p>
                                            <p className="text-sm">
                                                {course.description}
                                            </p>
                                            <p className="text-sm font-medium mt-2">
                                                Course Code:
                                            </p>
                                            <p className="text-sm">
                                                {course.course_code}
                                            </p>
                                        </div>
                                        <h4 className="text-lg font-semibold mb-2">
                                            Lessons
                                        </h4>
                                        {course.lessons.length > 0 ? (
                                            <ScrollArea className="h-[300px]">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-[200px]">
                                                                Title
                                                            </TableHead>
                                                            <TableHead>
                                                                Content Preview
                                                            </TableHead>
                                                            <TableHead className="w-[100px]">
                                                                Video
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {course.lessons.map(
                                                            (lesson) => (
                                                                <TableRow
                                                                    key={
                                                                        lesson.id
                                                                    }
                                                                >
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            lesson.title
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {lesson.content.substring(
                                                                            0,
                                                                            50,
                                                                        )}
                                                                        ...
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {lesson.video_url ? (
                                                                            <Badge variant="secondary">
                                                                                <Video className="mr-1 h-3 w-3" />
                                                                                Available
                                                                            </Badge>
                                                                        ) : (
                                                                            <Badge variant="outline">
                                                                                No
                                                                                Video
                                                                            </Badge>
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ),
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </ScrollArea>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">
                                                No lessons available for this
                                                course.
                                            </p>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No courses enrolled.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
