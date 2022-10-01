export class DomainResponse {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export type DomainResponseListType = DomainResponse[];