import RiperionApi from "../api"

export async function findAllDomains() {
    return await RiperionApi.get("domains");
}