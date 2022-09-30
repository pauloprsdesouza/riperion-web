import React from "react";
import RecommendationListing from "../../features/recommendations/recommendation-listing";

const RecommendationPage: React.FC = () => {
    return (<div className="d-flex justify-content-center">
        <div className="col text-center">
        <h1>Recomendações</h1>
        <RecommendationListing />
        </div>
    </div>)
}

export default RecommendationPage;