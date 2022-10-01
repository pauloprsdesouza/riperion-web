import React from "react";

interface Props {
    loading: boolean,
    textLoading: string,
    textShowing: string
}

const LoadingButton: React.FC<Props> = ({ loading, textLoading, textShowing }) => {
    function rendereizeLoading() {
        return loading ? <div><div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden"></span>
        </div>&nbsp;<span>{textLoading}</span> </div> : <span>{textShowing}</span>;
    }

    return (<>{rendereizeLoading()}</>)
}

export default LoadingButton;