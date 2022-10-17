import React from "react";

interface Props {
    loading: boolean,
    textLoading: string
}

const LoadingDiv: React.FC<Props> = ({ loading, textLoading }) => {
    function rendereizeLoading() {
        return loading ? <h5><div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden"></span>
        </div>&nbsp;<span>{textLoading}</span> </h5> : null;
    }

    return (<>{rendereizeLoading()}</>)
}

export default LoadingDiv;