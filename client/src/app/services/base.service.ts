
import {throwError as observableThrowError,  Observable } from 'rxjs';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { ErrorModel } from '../models/error-model';
import { Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { PageConfigModel } from '../models/pageConfig-model';
import { FeedbackErrorModel } from '../models/feedback-error-model';


//@Injectable()
export class BaseService {

    constructor() {}

    mapToHttpParams (map : Map<string,string>) : HttpParams {
        var httpParams : HttpParams = new HttpParams();
        if(map){
            map.forEach((value:string, key: string) => {
                httpParams = httpParams.set(key,value);  
              });
        }
        return httpParams;
    }

    pageConfigToParams(pageConfig: PageConfigModel) {
        let params: Map<string, string> = new Map<string, string>();
        if (pageConfig != null) {
            if (pageConfig.page != null && pageConfig.pageSize != null) {
                params.set('page', (pageConfig.page - 1).toString());
                params.set('size', pageConfig.pageSize.toString());
            }

            if (pageConfig.sort != null) {
                let sortParam = pageConfig.sort;
                if (pageConfig.order != null) {
                    sortParam = sortParam + ',' + (pageConfig.order ? "asc" : "desc");
                }
                params.set('sort', sortParam);
            }
        }
        return params;
    }

    protected handleError(err: HttpErrorResponse | any) {
        /*var err: ErrorModel = new ErrorModel();

        if (error instanceof Response) {
            const body = error.json() || '';

            err.statusCode = `${error.status}`;
            err.message = body.message || JSON.stringify(body);
            err.description = body.description;
            err.requestId = body.requestId;
        }
        else {
            err.message = error.message ? error.message : error.toString();
        }

        console.error(err);
        err.message = "Hi ha hagut un error genèric al servidor.";
        return Observable.throw(err);*/

        var errModel: FeedbackErrorModel = new FeedbackErrorModel();

        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. 
            errModel.message = err.message;
            //errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errModel.statusCode = err.status;
            errModel.message = err.message;
     
            //errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        
        console.error(errModel);
        errModel.message = "Hi ha hagut un error genèric al servidor.";
        return observableThrowError(errModel);
    }
}
