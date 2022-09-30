import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { singInUser } from '../../api/services/users-service';
import { autenticaded } from '../../authorization/jwt-token';
import { PostSignInRequest } from '../../model/login/post signin-request';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function signIn(): void {
        singInUser(new PostSignInRequest(email, password)).then((response: AxiosResponse) => {
            autenticaded(response.data.token, response.data.user.name);
            window.location.href = "/recommendations";
        })
            .catch((error: any) => {

            })
            .finally(() => {

            });
    }

    return (
        <div className='card shadow border-0'>
            <div className='card-body'>
                <h5 className='card-title'>Login</h5>
                <div className='form-group'>
                    <label className="form-label">Email</label>
                    <input type='text' className='form-control' onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                </div>
                <div className='form-group'>
                    <label className="form-label">Senha</label>
                    <input type='password' className='form-control' onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                </div>
                <button type='button' className='btn btn-primary' onClick={signIn}>Entrar</button>
            </div>
        </div >)
}

export default SignIn;