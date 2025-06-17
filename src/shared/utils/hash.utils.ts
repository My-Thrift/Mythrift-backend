import bcrypt from 'bcrypt'


export const hashWalletPin = async (pin: string): Promise<string> =>{
    return await bcrypt.hash(pin, 12)
}

export const compareWalletPin = async (pin: string, hash: string): Promise<Boolean> =>{
    return await bcrypt.compare(pin, hash)
}