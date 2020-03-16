import React, { Component } from 'react';
import './styles.css';
import apiConfig from '../../config/api-rest';
import { Redirect } from "react-router-dom";

class LoginForm extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            name: undefined,
            email: undefined,
            password: undefined,
            signUp: {
                success: undefined,
                message: undefined
            }
        }
    }

    static displayName = "ui-LoginForm";

    handleSignUpSubmit(e) {
        e.preventDefault();
        let dataToSend = {
            user: {
                name: this.refs.username.value,
                email: this.refs.email.value,
                password: this.refs.password.value,
            }
        }

        fetch(apiConfig.base_url + '/users/', {
            method: "POST",
            body: JSON.stringify(dataToSend.user),
            headers: {
                "Content-Type": "application/json"
            }

        }).then(response => response.json())
            .then(responseJson => {

                this.setState({
                    ...this.state,
                    signUp: {
                        success: responseJson.success,
                        message: responseJson.message
                    }
                })

            }).catch(err => {
                throw err;
            }).finally(
                this.refs.username.value = "",
                this.refs.email.value = "",
                this.refs.password.value = "",
            );

    }

    handleSubmit(e) {

        e.preventDefault();
        let dataToSend = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }

        fetch(apiConfig.base_url + '/users/authenticate', {
            method: "POST",
            body: JSON.stringify(dataToSend.user),
            headers: {
                "Content-Type": "application/json"
            }

        }).then(response => response.json())
            .then(responseJson => {

                if (responseJson.success) {
                    localStorage.setItem('USER_TOKEN', responseJson.token);
                }
                alert(responseJson.message);

            }).catch(err => {
                throw err;
            });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (

            <div>

                {/* Begin Modal Register Form */}
                <div className="modal fade" id="signupModel" tabIndex="-1" role="dialog" aria-labelledby="signupModelLabel" aria-hidden="true">

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="signupModelLabel">Cadastro</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                {
                                    this.state.signUp.success !== undefined ? (
                                        this.state.signUp.success ?

                                            <div className="alert alert-success" role="alert">
                                                {this.state.signUp.message}
                                            </div>
                                            :
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.signUp.message}
                                            </div>

                                    ) : ''
                                }
                                <form onSubmit={this.handleSignUpSubmit}>
                                    <input type="text" id="login" required="required" ref="username" className="fadeIn second" name="login" placeholder="nome" />
                                    <input type="email" id="login" required="required" ref="email" className="fadeIn second" name="login" placeholder="email" />
                                    <input type="password" id="password" required="required" ref="password" className="fadeIn third" name="login" placeholder="senha" />
                                    <input type="submit" className="fadeIn fourth" value="Cadastrar" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Begin Modal Register Form */}

                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first" style={{ padding: '10px' }}>
                            <img src="https://image.flaticon.com/icons/svg/1828/1828503.svg" height="100" id="icon" alt="User Icon" />
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <input type="email" required="required" onChange={this.handleEmailChange} id="login" className="fadeIn second" name="login" placeholder="email" />
                            <input type="password" required="required" onChange={this.handlePasswordChange} id="password" className="fadeIn third" name="login" placeholder="senha" />
                            <input type="submit" className="fadeIn fourth" value="Entrar" />
                            <a className="underlineHover" href="#">Esqueceu senha?</a>
                        </form>

                        <div id="formFooter">
                            <a className="underlineHover" href="#" data-toggle="modal" data-target="#signupModel">Cadastrar</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;