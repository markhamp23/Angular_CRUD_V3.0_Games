export class FeedbackModel {

    static TYPE_SUCCESS: string = "SUCCESS";
    static TYPE_ERROR: string = "ERROR";
    static TYPE_INFO: string = "INFO";

    type : string;
    statusCode: string;
    message: string;
    description: string;
    requestId: string;

    public isSuccess() : boolean {
        return this.type === FeedbackModel.TYPE_SUCCESS;
    }

    public isError() : boolean {
        return this.type === FeedbackModel.TYPE_ERROR;
    }

    public isInfo() : boolean {
        return this.type === FeedbackModel.TYPE_INFO;
    }

    public getStatusCode() : string {
        return this.statusCode;
    }

    public setStatusCode(statusCode : string){
        this.statusCode = statusCode;
    }

    public getMessage() : string {
        if(this.message==null || this.message=='' || this.message == 'undefined'){
            return 'Error genèric al servidor';
        }
        return this.message;
    }

    public setMessage(message : string){
        this.message = message;
    }

    public getDescription() : string {
        return this.description;
    }

    public setDescription(description : string){
        this.description = description;
    }

    public getRequestId() : string {
        return this.requestId;
    }

    public setRequestId(requestId : string){
        this.requestId = requestId;
    }

    public equals(o : FeedbackModel) : boolean {
        if(o==null){
            return false;
        }else{
            return (this.type == o.type &&
                    this.statusCode == o.statusCode &&
                    this.message == o.message &&
                    this.description == o.description &&
                    this.requestId == o.requestId);
        }
    }
}