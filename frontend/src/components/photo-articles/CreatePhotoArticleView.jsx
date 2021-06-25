import React, { useState } from "react";
import { articleViewContainerStyleSheet } from "../articles/articlesStyles";
import { useForm } from "react-hook-form";

function CreatePhotoArticleView() {
    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const inputStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const inputFieldStyle = {
        margin: "45px"
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    const handleImageChange = function (e) {
        e.preventDefault();

        let reader = new FileReader();
        let fileName = e.target.files[0];
        const isImage = isFileImage(fileName);
        console.log("is file image: " + isImage);
        reader.onloadend = () => {
            if (isImage) {
                setFile(fileName);
                setImagePreviewUrl(reader.result);
            }
        }

        reader.readAsDataURL(fileName)
    };

    const isFileImage = function (file) {
        return file && file['type'].split('/')[0] === 'image';
    }

    const previewImageStyle = {
        width: "100%",
        height: "100%",
        marginTop: "15px",
    };

    const previewComponentStyle = {
        margin: "30px",
    };

    let imagePreview = null;
    if (imagePreviewUrl) {
        imagePreview = (<img src={imagePreviewUrl} style={previewImageStyle} />);
    } else {
        imagePreview = (<div>Please select an Image for Preview</div>);
    }

    return (
        <div style={articleViewContainerStyle}>
            <h3 className="text-center">Upload photo to our gallery</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={inputStyle}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input style={inputFieldStyle} type="text" defaultValue="Title" {...register("title", { required: true })} />
                    {errors.title && <span>This field is required</span>}

                    <div style={previewComponentStyle}>
                        <input type="file" onChange={(e) => handleImageChange(e)} />
                        <div>{imagePreview}</div>
                    </div>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export { CreatePhotoArticleView };