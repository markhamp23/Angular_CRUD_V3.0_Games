export interface Pagina<T> {
    content: T[];
    totalPages :number;
    totalElements :number;
    last :boolean;
    size :number;
    number :number;
    first : boolean;
    //sort: null;
    numberOfElements: number;
}