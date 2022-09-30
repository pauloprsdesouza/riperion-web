export interface RecommendationResponse {
    id: string,
    tweetId: string,
    rating: number,
    createdAt: Date,
    updatedt: Date
}

export type RecommendationListType = RecommendationResponse[];