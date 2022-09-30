import { PutRecommendationRequest } from "../../model/recommendations/put-recommendation-request";
import RiperionApi from "../api";

export async function getRecommendationsByActiveUser() {
    return await RiperionApi.get("recommendations");
}

export async function evaluateRecommendation(recommendationId: string, putRecommendationRequest: PutRecommendationRequest) {
    return await RiperionApi.put(`recommendations/${recommendationId}/evaluate`, putRecommendationRequest);
}