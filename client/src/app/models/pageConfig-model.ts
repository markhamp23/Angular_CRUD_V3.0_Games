export class PageConfigModel {
    public page: number;
    public pageSize: number;
    public sort: string;
    public order: boolean;

    static ORDER_ASC: boolean = true;
    static ORDER_DESC: boolean = false;
}
