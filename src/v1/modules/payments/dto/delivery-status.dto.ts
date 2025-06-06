import { IsBoolean, IsString } from "class-validator";



export class DeliveryStatusDto {
    @IsBoolean()
    delivered!: Boolean

    @IsString()
    orderId!: string // compa
}