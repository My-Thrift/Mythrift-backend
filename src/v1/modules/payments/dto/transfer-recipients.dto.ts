import { IsString, Length } from "class-validator"


class TransferRecipientsDto {

    @IsString()
    name!: string 

    @IsString()
    @Length(10,10)
    accountNumber!: string 

    @IsString()
    bankCode!: string 
    
}

export default TransferRecipientsDto