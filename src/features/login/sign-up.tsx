import { autenticaded } from '../../authorization/jwt-token';
import { AxiosError, AxiosResponse } from 'axios';
import { getErrorMessage } from '../../model/errors/errors-enum';
import { PostSignUpRequest } from '../../model/login/post-signup-request';
import { singUpUser } from '../../api/services/users-service';
import AlertError from '../../components/alerts/alert-error';
import LoadingButton from '../../components/loading/loading-button';
import React, { useRef, useState } from 'react';

const SignUp: React.FC = () => {
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const formLogin = useRef<HTMLFormElement>(null);

    function validateForm() {
        if (formLogin.current)
            setIsFormValid(formLogin.current.checkValidity());
    }

    function signIn(event: React.FormEvent): void {
        event.preventDefault();

        setLoading(true);
        setErrors([]);

        singUpUser(new PostSignUpRequest(email, name, password, confirmPassword))
            .then((response: AxiosResponse) => {
                autenticaded(response.data.token, response.data.user.name);
                window.location.href = "/domains";
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
                } else {
                    setErrors(errors);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className='col-4 me-auto ms-auto mt-5'>
            {
                errors.map((message, index) => (
                    <AlertError key={index} message={message} />
                ))
            }
            <div className='card shadow border-0 mb-4'>
                <div className='card-body'>
                    <h4 className='card-title mb-4'>Login</h4>
                    <form className='needs-validation was-validated' ref={formLogin}
                        onChange={validateForm}
                        onSubmit={(event) => {
                            signIn(event);
                        }}
                        noValidate>
                        <div className='form-group mb-3'>
                            <label className="form-label">Seu nome</label>
                            <input type='text'
                                required
                                className='form-control'
                                onChange={(event) => {
                                    setName(event.target.value);
                                }} />
                        </div>
                        <div className='form-group mb-3'>
                            <label className="form-label">Seu endereço de email</label>
                            <input type='email'
                                required
                                className='form-control'
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }} />
                        </div>
                        <div className='form-group mb-3'>
                            <label className="form-label">Senha</label>
                            <input type='password'
                                required
                                className='form-control'
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }} />
                        </div>
                        <div className='form-group mb-3'>
                            <label className="form-label">Confirme a Senha</label>
                            <input type='password'
                                required
                                className='form-control'
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value);
                                }} />
                        </div>
                        <div className='d-grid gap-2'>
                            <button type='submit'
                                className='btn btn-primary'
                                disabled={loading || !isFormValid}>
                                <LoadingButton textLoading='Salvando...' textShowing='Salvar' loading={loading} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

export default SignUp;