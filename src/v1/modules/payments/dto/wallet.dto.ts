import { IsEmail, isEmail, IsString, Length } from "class-validator";


export class CreateWalletDto {
    @IsString()
    @Length(3,12)
    firstName!: string

    @IsString()
    @Length(3,12)
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