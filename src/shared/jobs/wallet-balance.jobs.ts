import cron from 'node-cron'
import WalletDatasource from '../../v1/modules/payments/datasource/wallet.datasource';
import { container } from 'tsyringe';

const walletDatasource = container.resolve(WalletDatasource);

cron.schedule('00 1 * * 2,4,6', async () => {
    try {
        console.log('Running a task every Tuesday, Thursday, and Saturday at 1:00 AM');
        await walletDatasource.updateWalletBalanceFromPendingBalance();
        console.log('Wallet balance update task completed successfully.');
    } catch (error) {
        console.error('Error occurred while updating wallet balance:', error);
    }
});