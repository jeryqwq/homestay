import axios from 'axios';
export default function (api,fn){
    axios.get(api).then((res)=>{
        console.log(res);
        fn(res)
    })
}
