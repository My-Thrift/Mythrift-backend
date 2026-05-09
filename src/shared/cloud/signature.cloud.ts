import crypto from 'crypto'
import appConfig from '../../config/app.config';

export function generateSignature(payload: any, secret: string) {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

