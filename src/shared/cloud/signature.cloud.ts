import crypto from 'crypto'
import appConfig from '../../config/app.config';

export function generateSignature(payload: any) {
    return crypto.createHmac('sha256', appConfig.cloud.cloud_secret).update(payload).digest('hex');
}
