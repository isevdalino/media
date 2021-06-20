import React from "react";
import { useForm } from "react-hook-form";
import { commentItemStyleSheet } from "./commentStyles";

function CreateCommentView() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const commentItemStyle = commentItemStyleSheet();

    const spanStyle = {
        color: "red"
    };

    const buttonStyle = {
        margin: "1%"
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea rows="2" cols="50" style={commentItemStyle} placeholder="Comment..." type="text" {...register("comment", { required: true })} />
                {errors.comment && <span style={spanStyle}>This field is required</span>}
                <input style={buttonStyle} type="submit" />
            </form>
        </div>
    );
}

export { CreateCommentView };