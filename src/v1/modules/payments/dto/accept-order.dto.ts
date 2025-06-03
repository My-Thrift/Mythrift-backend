import { IsIn, IsString } from "class-validator";

export class AcceptOrderDto {

    @IsString()
    orderReference!: string

    @IsString()
    vendorId!: string

    @IsString()
    @IsIn(['success', 'pending', 'declined'])
    vendorStatus!: string

    @IsString()
    recipientCode!: string

}