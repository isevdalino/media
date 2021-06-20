import React from "react";
import { articleViewContainerStyleSheet } from "./articlesStyles";
import { useForm } from "react-hook-form";

function CreateArticleView() {
    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const inputStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const inputFieldStyle = {
        margin: "15px"
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    // console.log(watch("title")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div style={articleViewContainerStyle}>
            <h3 className="text-center">Create your new article</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={inputStyle}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input style={inputFieldStyle} type="text" defaultValue="Title" {...register("title", { required: true })} />
                    {errors.title && <span>This field is required</span>}

                    {/* include validation with required or other standard HTML validation rules */}
                    <textarea rows="15" cols="50" style={inputFieldStyle} type="text" defaultValue="Content" {...register("content", { required: true })} />
                    {/* errors will return when field validation fails  */}
                    {errors.content && <span>This field is required</span>}
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export { CreateArticleView };