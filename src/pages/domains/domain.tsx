import React from "react";
import DomainListing from "../../features/domains/domain-listing";

const DomainPage: React.FC = () => {
    return (<>
    <h4 className="mb-5">Selecione pelo menos 5 categorias que melhor representam seu interesse</h4>
        <DomainListing />
    </>)
}

export default DomainPage;