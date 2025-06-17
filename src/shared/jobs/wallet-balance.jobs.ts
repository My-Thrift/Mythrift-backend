import cron from 'node-cron'
import WalletDatasource from '../../v1/modules/payments/datasource/wallet.datasource';
import { container } from 'tsyringe';

const walletDatasource = container.resolve(WalletDatasource);

cron.schedule('17 21 * * 1,2,5', async () => {
    try {
        console.log('Running a task every Monday, Wednesday, and Friday at 9:00 PM');
        await walletDatasource.updateWalletBalanceFromPendingBalance();
        console.log('Wallet balance update task completed successfully.');
    } catch (error) {
        console.error('Error occurred while updating wallet balance:', error);
    }
});