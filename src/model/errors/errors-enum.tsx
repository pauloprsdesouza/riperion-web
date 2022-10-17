export enum ErrorsStatusEnum {
    USER_NOT_FOUND = "Usuário não cadastrado",
    USER_DOES_NOT_HAVE_PROFILE = "Usuário não possui perfil",
}

export function getErrorMessage(key: string): string {
    const indexOf = Object.keys(ErrorsStatusEnum).indexOf(key);
    return Object.values(ErrorsStatusEnum)[indexOf];
}