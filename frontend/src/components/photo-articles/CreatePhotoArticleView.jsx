import React, { useState } from "react";
import { articleViewContainerStyleSheet } from "../articles/articlesStyles";
import { useHistory } from 'react-router';
import { postArticle } from "../../server-requests/requests";
import { SIGN_IN } from "../../constants/Paths";
import { onLogoutClick } from '../login/logoutHandler';

function CreatePhotoArticleView({ setIsUserLoggedInState }) {
    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const inputStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const inputFieldStyle = {
        margin: "45px"
    };

    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [register, setRegister] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorUiList, setErrorUiList] = useState([]);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    const changeErrorsWith = function (newErrors) {
        setFormErrors(newErrors);

        let errorList = Object.keys(formErrors).map(
            key => (<li key={key} className="error-style">{formErrors[key]}</li>)
        );
        setErrorUiList(errorList);
    }

    const changeFile = function (fileName, url) {
        setFile(fileName);
        setImagePreviewUrl(url);
    }

    const handleChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        let currentFormErrors = formErrors;

        switch (name) {
            case 'name':
                setRegister({ ...register, name: value });
                break;
            case 'topic':
                setRegister({ ...register, topic: value });
                break;
            default:
                break;
        }

        changeErrorsWith(currentFormErrors);
    };

    const handleImageChange = function (e) {
        e.preventDefault();

        new Promise((resolve, reject) => {
            let fileName = e.target.files[0];
            if (fileName == null) {
                throw new Error("File was not chosen");
            }
            const reader = new FileReader();
            reader.readAsDataURL(fileName);
            const isImage = isFileImage(fileName)
            reader.onload = () => {
                if (isImage) {
                    changeFile(fileName, reader.result);
                }
                resolve(reader.result);
            }
            reader.onerror = error => reject(error);
        })
            .then(result => setBase64Image(result))
            .catch(e => {
                console.error(e);
                changeFile("", "");
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        postArticle(register.name, register.topic, base64Image, true).then(data => {
            if (data.status == 403) {
                onLogoutClick(history, SIGN_IN, setIsUserLoggedInState)
            }else if (data.status == 400) {
                data.json().then(data => {setErrorMessage(data.name||data.topic||data.content)})
              } else {
                data.json().then(data => history.push("/photo-articles/" + data._id))
            }
        })
    }

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
            <form noValidate onSubmit={handleSubmit}>
                <div style={inputStyle}>
                    <input style={inputFieldStyle} type="text" placeholder="Name" name="name" noValidate onBlur={handleChange} />
                    <input style={inputFieldStyle} type="text" placeholder="Topic" name="topic" noValidate onBlur={handleChange} />

                    <div style={previewComponentStyle}>
                        <input type="file" onChange={(e) => handleImageChange(e)} />
                        <div>{imagePreview}</div>
                    </div>
                </div>
                <input type="submit" />
            </form>
            {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
        </div>
    );
}

export { CreatePhotoArticleView };