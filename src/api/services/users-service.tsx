import { PostSignInRequest } from "../../model/login/post signin-request";
import RiperionApi from "../api"


export async function singInUser(request: PostSignInRequest) {
    return await RiperionApi.post("users/signin", request);
}