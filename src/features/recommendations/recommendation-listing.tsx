import "./recommendation-listing.css"
import { AxiosResponse } from "axios";
import { getRecommendationsByActiveUser } from "../../api/services/recommendations-service";
import { RecommendationListType } from "../../model/recommendations/recommendation-response";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import RatingStar from "./rating-stars";
import React, { useEffect, useState } from "react";

const RecommendationListing: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [recommendations, setRecommendations] = useState<RecommendationListType>([]);

    useEffect(() => {
        loadRecommendations()
    }, [])

    function loadRecommendations() {
        setLoading(true);

        getRecommendationsByActiveUser()
            .then((response: AxiosResponse) => {
                setRecommendations(response.data.recommendations)
            })
            .catch((errors) => {

            })
            .finally(() => {
                setLoading(false)
            });
    }

    function renderizeRecommendations() {
        return recommendations && !loading ? recommendations.map(recommendation => (
            <div key={recommendation.id} className="card card-width shadow border-0 mb-3 me-auto ms-auto">
                <div className="card-body">
                    <TwitterTweetEmbed tweetId={recommendation.tweetId} options={{ lang: "pt" }} />
                </div>
                <div className="card-footer text-center p-2 card-footer-dark">
                    <h5>Quão relevante foi esta recomendação para você?</h5>
                    <RatingStar recommendation={recommendation} />
                </div>
            </div>
        )) : null;
    }

    return (
        <>
            {renderizeRecommendations()}
        </>
    )
}

export default RecommendationListing;