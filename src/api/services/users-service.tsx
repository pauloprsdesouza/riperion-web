import { PostSignInRequest } from "../../model/users/post signin-request";
import { PutUserPreferencesRequest } from "../../model/users/put-user-preferences-request";
import RiperionApi from "../api"

export async function singInUser(request: PostSignInRequest) {
    return await RiperionApi.post("users/signin", request);
}

export async function singUpUser(request: PostSignInRequest) {
    return await RiperionApi.post("users/signup", request);
}

export async function saveUserPreferences(request: PutUserPreferencesRequest) {
    return await RiperionApi.put("users/preferences", request);
}