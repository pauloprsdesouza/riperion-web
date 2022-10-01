import React from "react";
import RecommendationListing from "../../features/recommendations/recommendation-listing";

const RecommendationPage: React.FC = () => {
    return (<div className="d-flex flex-column justify-content-center text-center">

        <h1>Recomendações</h1>
        <RecommendationListing />

    </div>)
}

export default RecommendationPage;