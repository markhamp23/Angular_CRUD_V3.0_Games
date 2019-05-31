import {FeedbackModel} from "./feedback-model";

export class FeedbackErrorModel extends FeedbackModel {
    constructor(){
        super();
        this.type = FeedbackModel.TYPE_ERROR;
    }
}