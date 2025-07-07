import { IsEmail, isEmail, IsString, Length } from "class-validator";


export class CreateWalletDto {
    @IsString()
    firstName!: string

    @IsString()
    lastName!: string

    @IsString()
    @Length(4,4)
    walletPin!: string

    @IsEmail()
    email!:string 

    @IsString()
    @Length(14, 14)
    phoneNumber!: string

    @IsString()
    myThriftId!: string
}