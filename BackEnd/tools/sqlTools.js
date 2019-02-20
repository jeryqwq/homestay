
class ServerResponse{
     static  ServerSuccess(data,msg){
        return {
            state:0,
            data,
            msg
        }
    }
    static ServerFail(msg){
        return{
            state:1,
            msg
        }
    }
}
module.exports=ServerResponse;