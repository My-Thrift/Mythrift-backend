import { IsBoolean, IsIn, isString, IsString } from "class-validator";



export class DeliveryStatusDto {
    @IsBoolean()
    @IsIn([true])
    status!: Boolean

    @IsString()
    orderReference!: string // compa

    @IsString()
    vendorId!: string
}