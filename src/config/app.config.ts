import dotenv from 'dotenv'
dotenv.config()
const appConfig = {
    app: {
        name: process.env.APP_NAME as string,
        environment: process.env.NODE_ENV || 'development',
        apiKey: process.env.API_KEY as string
    },
    server: {
        port: Number(process.env.PORT) || 3000
    },
    database: {
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT),
        name: process.env.DATABASE_NAME as string,
        password: process.env.DATABASE_PASSWORD as string,
        username: process.env.DATABASE_USERNAME as string,
        migration: process.env.MIGRATION_PATH as string
    },
    paystack: {
        api_key: process.env.PAYSTACK_SECRET_KEY as string,
        base_url: process.env.PAYSTACK_BASE_URL as string
    },
    cloud: {
        cloud_url: process.env.CLOUD_URL as string,
        cloud_secret: process.env.CLOUD_SECRET_KEY as string
    }
}

export default appConfig