import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { findAllDomains } from "../../api/services/domains-service";
import { saveUserPreferences } from "../../api/services/users-service";
import LoadingDiv from "../../components/loading/loading-div";
import DomainListing from "../../features/domains/domain-listing";
import { DomainResponse, DomainResponseListType } from "../../model/domains/domain-response";
import { PutUserPreferencesRequest } from "../../model/users/put-user-preferences-request";

const DomainPage: React.FC = () => {
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

    function selectDomain(currentDomain: DomainResponse) {
        var domainsTemp = [...domains];

        domainsTemp.forEach((domain) => {
            if (currentDomain === domain) {
                domain.active = !domain.active;
            }
        });

        setDomains(domainsTemp);
    }

    function savePreferences() {
        var domainIds: Array<any> = [];

        domains.forEach((domain) => {
            if (domain.active) {
                domainIds.push(domain.id);
            }
        })

        saveUserPreferences(new PutUserPreferencesRequest(domainIds))
            .then((response: AxiosResponse) => {
                window.location.href = "/recommendations";
            })
            .catch((error: AxiosError) => {

            })
            .finally(() => {
                setLoading(false);
            })
    }

    function renderizeSelectedCategories() {
        return domains.filter(x => x.active).length === 0 ? <span className="led">Nenhuma categoria selecionada.</span> :
            <>
                <h6>Categorias selecionadas</h6>
                {domains.filter(x => x.active).map((domain) => (
                    <span key={domain.id} className="badge bg-primary me-2">{domain.name}</span>
                ))}
            </>
    }

    function renderizeDomains() {
        return loading ? <LoadingDiv loading={loading} textLoading="Carregando..." /> : <DomainListing domains={domains} selectDomain={selectDomain} />;
    }

    return (<>
        <h4 className="mb-4">Selecione pelo menos 5 categorias que melhor representam seu interesse</h4>


        <div className="mb-4">
            {renderizeSelectedCategories()}
        </div>

        <div className="card shadow border-0 mb-4">
            <div className="card-body text-center">
                {renderizeDomains()}
            </div>
        </div>
        <div className="text-end">
            <button className="btn btn-outline-primary" onClick={() => {
                savePreferences()
            }}>Vamos para as recomendações</button>
        </div>
    </>)
}

export default DomainPage;