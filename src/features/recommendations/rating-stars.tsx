import "./rating-stars.css"
import { AxiosResponse } from "axios";
import { evaluateRecommendation } from "../../api/services/recommendations-service";
import { PutRecommendationRequest } from "../../model/recommendations/put-recommendation-request";
import { RecommendationResponse } from "../../model/recommendations/recommendation-response";
import React, { useEffect, useState } from "react";

interface Props {
    recommendation: RecommendationResponse
}

class Rating {
    level: number;
    selected: boolean;
    loading: boolean;

    constructor(rating: number, selected: boolean, loading: boolean) {
        this.level = rating;
        this.selected = selected;
        this.loading = loading;
    }
}

const RatingStar: React.FC<Props> = ({ recommendation }) => {
    const [loading, setLoading] = useState<boolean>();
    const [ratings, setRatings] = useState<Rating[]>([
        new Rating(1, false, false),
        new Rating(2, false, false),
        new Rating(3, false, false),
        new Rating(4, false, false),
        new Rating(5, false, false)
    ]);

    useEffect(() => {
        var currentRating = new Rating(recommendation.rating, false, false);

        selectRating(currentRating);
    }, [recommendation]);

    function evaluate(currentRating: Rating): void {
        setLoading(true);

        selectRating(currentRating);

        evaluateRecommendation(recommendation.id, new PutRecommendationRequest(currentRating.level))
            .then((response: AxiosResponse) => {
                selectRating(new Rating(response.data.rating as number, false, false));
            })
            .catch((errors) => {

            })
            .finally(() => {
                selectRating(currentRating);
            })
    }

    function selectRating(currentRating: Rating) {
        var ratingsTemp: Rating[] = [...ratings];

        currentRating.loading = !currentRating.loading;

        if (!currentRating.selected) {
            for (var i = 0; i < currentRating.level; i++) {
                ratingsTemp[i].selected = true;
            }

        } else {
            for (var i = 5; i > currentRating.level; i--) {
                ratingsTemp[i - 1].selected = false;
            }
            if (currentRating.level === 1) {
                ratingsTemp[0].selected = false;
            }
        }

        setRatings(ratingsTemp);
    }

    function renderizeLoading(rating: Rating) {
        return rating.loading ? <div className="spinner-border text-warning spinner-border" role="status">
            <span className="visually-hidden"></span>
        </div> : <i className={`fa-2x fa-star ${rating.selected ? "fa-solid" : "fa-regular"}`}></i>;
    }

    function renderizeRatings() {
        return ratings.map(rating => (
            <button key={rating.level} disabled={rating.loading} className="btn btn-link text-warning btn-sm" onClick={() => {
                evaluate(rating)
            }}>{renderizeLoading(rating)}
            </button>
        ))
    }

    return (<div className="d-flex flex-row align-items-center justify-content-around ratings-height">
        {renderizeRatings()}
    </div>)
}

export default RatingStar;