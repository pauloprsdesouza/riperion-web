import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import RiperionApi from '../../api/api';
import { autenticaded } from '../../authorization/jwt-token';

const SignUp: React.FC = () => {
    const [cpf, setCpf] = useState<string>();
    const [password, setPassword] = useState<string>();

    function signIn(): void {
        RiperionApi.post("nutritionists/signin", { cpf: cpf, password: password })
            .then((response: AxiosResponse) => {
                autenticaded(response.data.token, response.data.user.name);
                window.location.href = "/monitoring";
            })
            .catch((error: any) => {

            })
            .finally(() => {

            });
    }

    return (
        <div className='card shadow border-0'>
            <div className='card-body'>
                <h5 className='card-title'>Novo Usuário</h5>
                <div className='form-group'>
                    <label className="form-label">CPF</label>
                    <input type='text' className='form-control' onChange={(event) => {
                        setCpf(event.target.value);
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

export default SignUp;