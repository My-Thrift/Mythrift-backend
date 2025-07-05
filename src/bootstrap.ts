import { AppDatasource } from "./database"
import { types as pgTypes } from 'pg';

const connectToDb = async ()=>{
try {
pgTypes.setTypeParser(pgTypes.builtins.NUMERIC, (val: string) =>
  val === null ? null : parseFloat(val)
);
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