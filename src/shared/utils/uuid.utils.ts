import { v4 as uuidV4} from 'uuid'


const uuidGenerator = (): string =>{
    return uuidV4()
}

export default uuidGenerator