import React from "react";
import { DomainResponseListType } from "../../model/domains/domain-response";

interface Props {
    domains: DomainResponseListType,
    selectDomain: Function
}

const DomainListing: React.FC<Props> = ({ domains, selectDomain }) => {

    return (<div className="row justify-content-between">
        {
            domains.map(domain => (
                <div key={domain.id} className="col p-1">
                    <button type="button" className={`btn btn-sm ${domain.active ? "btn-secondary" : "btn-outline-secondary"} text-nowrap`} onClick={() => {
                        selectDomain(domain);
                    }}>{domain.name}</button>
                </div>
            ))
        }
    </div>)
}

export default DomainListing;