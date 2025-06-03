import { IsIn, IsString } from "class-validator";

export class VendorDecisionDto {

    @IsString()
    orderReference!: string

    @IsString()
    vendorId!: string

    @IsString()
    @IsIn(['accepted', 'declined'])
    vendorStatus!: string

    @IsString()
    recipientCode!: string

}