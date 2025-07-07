import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length } from 'class-validator'


export class TransactionsDto {

    @IsString()
    @Length(28,28)
    @IsNotEmpty()
    userId!: string

    @IsArray()
    cartItems!: any 

    @IsObject()
    @IsOptional()
    deliveryInfo?: any

    @IsObject()
    @IsNotEmpty()
    userInfo?: any

    @IsString()
    @IsOptional()
    note?: string

    @IsString()
    @IsNotEmpty()
    firstName!: string

    @IsString()
    @IsNotEmpty()
    lastName!: string

    @IsString()
    @Length(28,28)
    @IsNotEmpty()
    vendorId!: string

    @IsNumber()
    @IsNotEmpty()
    serviceFee!: number

    @IsNumber()
    @IsNotEmpty()
    deliveryFee!: number

    @IsNumber()
    @IsNotEmpty()
    amount!: number

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsBoolean()
    @IsNotEmpty()
    isStockpile!: Boolean

    @IsNumber()
    @IsOptional()
    stockpileDuration!: number

    @IsString()
    @IsOptional()
    draftToken!: string

    @IsString()
    @IsOptional()
    walletId?: string
    
}