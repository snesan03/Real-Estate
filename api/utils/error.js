export const errorGenerator=(statuscode,message)=>{
    const error=new Error();
    error.message=message;
    error.statuscode=statuscode;
    return error;
}