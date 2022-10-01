import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { findAllDomains } from "../../api/services/domains-service";
import { DomainResponseListType } from "../../model/domains/domain-response";

const DomainListing: React.FC = () => {
    const [domains, setDomains] = useState<DomainResponseListType>([]);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        setLoading(true);

        findAllDomains()
            .then((response: AxiosResponse) => {
                setDomains(response.data.domains);
            })
            .catch((error: AxiosError) => {

            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return (<div className="row justify-content-between">
        {
            domains.map(domain => (
                <div key={domain.id} className="col p-1">
                    <button className="btn btn-outline-primary text-nowrap" >{domain.name}</button>
                </div>
            ))
        }
    </div>)
}

export default DomainListing;