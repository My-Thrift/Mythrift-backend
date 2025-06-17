import { IsNumber, IsString, Length } from "class-validator";


export class RequestPayoutDto {
    @IsString()
    vendorId!: string

    @IsString()
    @Length(4,4)
    walletPin!: string

    @IsNumber()
    payoutAmount!: number
}