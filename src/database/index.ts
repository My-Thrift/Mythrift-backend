import { DataSource } from "typeorm";
import path from "path";
import appConfig from "../config/app.config";
import Transactions from "./entities/transactions.entities";
import PendingPayments from "./entities/pending-payments.entities";
import Refunds from "./entities/refunds.entities";
import Transfers from "./entities/transfers.entities";
import ApiKey from "./entities/keys.entities";
import BankCode from "./entities/bank-code.entities";
import Recipients from "./entities/recipients.entities";
import Wallet from "./entities/wallet.entities";
import WalletTransaction from "./entities/wallet-transactions.entities";
import Customer from "./entities/customer.entities";

export const AppDatasource = new DataSource({
    type: 'postgres',
    host: appConfig.database.host || 'localhost',
    username: appConfig.database.username || 'postgres',
    port: appConfig.database.port || 5432,
    database: appConfig.database.name,
    password: appConfig.database.password,
    entities: [
    Transactions,
    PendingPayments,
    Refunds,
    Recipients,
    Transfers,
    ApiKey,
    BankCode,
    Wallet,
    WalletTransaction,
    Customer
],
    logging: true,
    synchronize: false,
    dropSchema: false,
    migrations: [appConfig.database.migration],

})
console.log('Loading migrations from:', AppDatasource.options.migrations);
