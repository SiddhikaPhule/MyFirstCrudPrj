export class ErrorHandler extends Error{
    status: number;   
    msg: string;      
    constructor(status: number, msg:string){
        super();
        this.status = status;
        this.msg = msg;
    }
}