import { IsString } from "class-validator";


export class RequestPayoutDto {
    @IsString()
    vendorId!: string
}