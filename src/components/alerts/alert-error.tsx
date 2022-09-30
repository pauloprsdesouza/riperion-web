import React, { useState } from "react";

interface Props {
    message: string
}

const AlertError: React.FC<Props> = ({ message }) => {
    const [errorMessage, setErrorMessage] = useState<string>(message)

    function closeAlert() {
        setErrorMessage("");
    }

    function renderizeAlert() {
        return errorMessage !== "" ?
            <div className="alert alert-danger alert-dismissible fade show border-0 shadow-md" role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => { closeAlert() }}></button>
            </div> : null
    }

    return (<>
        {renderizeAlert()}
    </>
    )
}

export default AlertError;