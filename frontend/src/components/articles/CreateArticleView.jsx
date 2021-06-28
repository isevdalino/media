import React,{ useState } from "react";
import { articleViewContainerStyleSheet } from "./articlesStyles";
import { useHistory } from 'react-router';
import { postArticle } from "../../server-requests/requests";
import { SIGN_IN } from "../../constants/Paths";
import { onLogoutClick } from '../login/logoutHandler';

function CreateArticleView({setIsUserLoggedInState}) {
    const articleViewContainerStyle = articleViewContainerStyleSheet();
    const inputStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const inputFieldStyle = {
        margin: "15px"
    };

    const [register, setRegister] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorUiList, setErrorUiList] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        postArticle(register.title,register.topic,register.content).then(data => {
            if(data.status == 403){
                onLogoutClick(history,SIGN_IN, setIsUserLoggedInState) 
            }else{
                history.push("/articles/"+data.json()._id);
            }
        })
    }
    const changeErrorsWith = function (newErrors) {
        setFormErrors(newErrors);

        let errorList = Object.keys(formErrors).map(
            key => (<li key={key} className="error-style">{formErrors[key]}</li>)
        );
        setErrorUiList(errorList);
    }

    const handleChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        let currentFormErrors = formErrors;

        switch (name) {
            case 'title':
                setRegister({ ...register, title: value });
                break;
            case 'topic':
                setRegister({ ...register, topic: value });
                break;
            case 'content':
                setRegister({ ...register, content: value });
                break;
            default:
                break;
        }

        changeErrorsWith(currentFormErrors);
    };

    return (
        <div style={articleViewContainerStyle}>
            <h3 className="text-center">Create your new article</h3>
            <form noValidate onSubmit={handleSubmit}>
                <div style={inputStyle}>
                    <input style={inputFieldStyle} placeholder='Title' type='text' name='title' noValidate onBlur={handleChange} />
                    <input style={inputFieldStyle} placeholder='Topic' type='text' name='topic' noValidate  onBlur={handleChange}/>
                    <textarea rows="15" cols="50" style={inputFieldStyle} placeholder='Content' type='text' name='content' noValidate onBlur={handleChange}/>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export { CreateArticleView };