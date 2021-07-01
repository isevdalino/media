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
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        postArticle(register.name,register.topic,register.content,false).then(data => {
            if(data.status == 403){
                onLogoutClick(history,SIGN_IN, setIsUserLoggedInState) 
            }else if (data.status == 400) {
                data.json().then(data => {setErrorMessage(data.name||data.topic||data.content)})
            }else{
                data.json().then(data =>history.push("/articles/"+data._id))
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
            case 'name':
                setRegister({ ...register, name: value });
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
                    <input style={inputFieldStyle} placeholder='Name' type='text' name='name' noValidate onBlur={handleChange} />
                    <input style={inputFieldStyle} placeholder='Topic' type='text' name='topic' noValidate  onBlur={handleChange}/>
                    <textarea rows="15" cols="50" style={inputFieldStyle} placeholder='Content' type='text' name='content' noValidate onBlur={handleChange}/>
                </div>
                <input type="submit" />
            </form>
            {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
        </div>
    );
}

export { CreateArticleView };