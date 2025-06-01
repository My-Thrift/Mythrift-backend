import { AppDatasource } from "./database"

const connectToDb = async ()=>{
try {
    await AppDatasource.initialize()
    console.info('Connected to database successfully')
} catch (error) {
    console.error(error)
}

}
const bootstrap = async ()=>{
    await connectToDb()
} 

export default bootstrap