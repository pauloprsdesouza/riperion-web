export class DomainResponse {
    id: string;
    name: string;
    active: boolean;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.active = false;
    }
}

export type DomainResponseListType = DomainResponse[];