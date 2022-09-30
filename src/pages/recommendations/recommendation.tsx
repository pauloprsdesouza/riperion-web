import React from "react";
import RecommendationListing from "../../features/recommendations/recommendation-listing";

const RecommendationPage: React.FC = () => {
    return (<div className="mx-auto">
        <h1>Recommendation</h1>
        <RecommendationListing />
    </div>)
}

export default RecommendationPage;