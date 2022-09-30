export enum ErrorsStatusEnum {
    USER_NOT_FOUND = "Usuário não cadastrado",
}

export function getErrorMessage(key: string): string {
    const indexOf = Object.keys(ErrorsStatusEnum).indexOf(key);
    return Object.values(ErrorsStatusEnum)[indexOf];
}