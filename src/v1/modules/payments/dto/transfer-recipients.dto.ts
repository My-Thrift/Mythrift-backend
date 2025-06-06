import { IsString, Length } from "class-validator"


export class TransferRecipientsDto {

    @IsString()
    name!: string 

    @IsString()
    @Length(10,10)
    accountNumber!: string 

    @IsString()
    bankCode!: string 

    @IsString()
    @Length(28,28)
    vendorId!: string 
    
}

export default TransferRecipientsDto