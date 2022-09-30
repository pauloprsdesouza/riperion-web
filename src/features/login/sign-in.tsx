import { AxiosError, AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import { singInUser } from '../../api/services/users-service';
import { autenticaded } from '../../authorization/jwt-token';
import AlertError from '../../components/alerts/alert-error';
import { getErrorMessage } from '../../model/errors/errors-enum';
import { PostSignInRequest } from '../../model/login/post signin-request';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>();
    const [errors, setErrors] = useState<string[]>([]);

    const formLogin = useRef<HTMLFormElement>(null);
    const [isFormValid, setIsFormValid] = useState(false);

    function validateForm() {
        if (formLogin.current)
            setIsFormValid(formLogin.current.checkValidity());
    }

    function signIn(event: React.FormEvent): void {
        event.preventDefault();

        setLoading(true);
        setErrors([]);

        singInUser(new PostSignInRequest(email, password))
            .then((response: AxiosResponse) => {
                autenticaded(response.data.token, response.data.user.name);
                window.location.href = "/recommendations";
            })
            .catch((error: AxiosError) => {
                var response: any = error.response?.data;
                var statusCode: any = error.response?.status
                var errors: string[] = response.errors

                if (statusCode === 422) {
                    var errorsTemp: string[] = [];

                    errors.map(message => {
                        errorsTemp.push(getErrorMessage(message))
                    });

                    setErrors(errorsTemp);
                } else if (statusCode === 403) {
                    setErrors(["Usuário ou senha inválidos"]);
                } else {
                    setErrors(errors);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function rendereizeLoadingValidate() {
        return loading ? <div><div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden"></span>
        </div><span>Validando...</span> </div> : <span>Validar</span>;
    }

    return (
        <div className='col-4 me-auto ms-auto mt-5'>
            {
                errors.map((message, index) => (
                    <AlertError key={index} message={message} />
                ))
            }
            <div className='card shadow border-0'>
                <div className='card-body'>
                    <h4 className='card-title mb-4'>Login</h4>
                    <form className='needs-validation was-validated mb-4' ref={formLogin}
                        onChange={validateForm}
                        onSubmit={(event) => {
                            signIn(event);
                        }}
                        noValidate>
                        <div className='form-group mb-3'>
                            <label className="form-label">Use seu endereço de email</label>
                            <input type='email'
                                required
                                className='form-control'
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }} />
                        </div>
                        <div className='form-group mb-4'>
                            <div className='d-flex flex-row justify-content-between'>
                                <label className="form-label">Senha</label>
                                <a className='form-label text-decoration-none' href='/'>Esqueci a senha</a>
                            </div>
                            <input type='password'
                                required
                                className='form-control'
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }} />
                        </div>
                        <div className='d-grid gap-2'>
                            <button type='submit'
                                className='btn btn-primary'
                                disabled={loading || !isFormValid}>
                                {rendereizeLoadingValidate()}
                            </button>
                        </div>
                    </form>

                    <div className='card'>
                        <div className='card-body'>
                            <span>Não tem cadastro?</span>&nbsp;<a className='form-label text-decoration-none' href='/'>Clique aqui</a>
                        </div>
                    </div>
                </div>
            </div >
        </div>)
}

export default SignIn;