import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateLesson = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        video_url: "",
        course_id: "", // You could populate this with a dropdown of available courses
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("lessons.store")); // Send the form data to the Laravel backend
    };

    return (
        <div>
            <h1>Create Lesson</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    {errors.title && <div>{errors.title}</div>}
                </div>

                <div>
                    <label>Content:</label>
                    <ReactQuill
                        value={data.content}
                        onChange={(content) => setData("content", content)}
                    />
                    {errors.content && <div>{errors.content}</div>}
                </div>

                <div>
                    <label>Video URL (optional):</label>
                    <input
                        type="url"
                        value={data.video_url}
                        onChange={(e) => setData("video_url", e.target.value)}
                    />
                    {errors.video_url && <div>{errors.video_url}</div>}
                </div>

                <div>
                    <label>Course ID:</label>
                    <input
                        type="text"
                        value={data.course_id}
                        onChange={(e) => setData("course_id", e.target.value)}
                    />
                    {errors.course_id && <div>{errors.course_id}</div>}
                </div>

                <button type="submit" disabled={processing}>
                    Create Lesson
                </button>
            </form>
        </div>
    );
};

export default CreateLesson;
