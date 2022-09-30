export class RoutePath {
    path: string;
    name: string;

    constructor(path: string, name: string) {
        this.path = path;
        this.name = name;
    }
}

const recommendations = new RoutePath("/recommendations", "Recomendações");
const home = new RoutePath("/home", "Home");
const search = new RoutePath("/search", "Buscar");

export const routes = [recommendations, home, search]



