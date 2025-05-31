import { AppDatasource } from "./database "



const bootstrap = async ()=>{
    await AppDatasource.initialize()
} 

export default bootstrap