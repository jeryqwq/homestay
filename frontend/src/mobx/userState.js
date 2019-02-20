import {observable} from 'mobx';

export default observable({
    user: {isLogin:false},
    login(user){
        this.user={
            ...user
        };
        this.user.isLogin=true;
    },
    logout(){
        this.user={isLogin:false};
    }
});
