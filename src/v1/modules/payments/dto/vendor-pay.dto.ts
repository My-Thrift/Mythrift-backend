import { IsNumber, IsString } from "class-validator";


export class RequestPayoutDto {
    @IsString()
    vendorId!: string

    @IsString()
    walletPin!: string

    @IsNumber()
    payoutAmount!: number
}