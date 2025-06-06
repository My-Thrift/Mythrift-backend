# My Thrift Payments

My Thrift Payments is a backend application built with Node.js and TypeScript to manage transactions, payments, refunds, and administrative operations. It provides APIs for handling vendor operations, payment processing, and database management using TypeORM.

---

## Project Structure

```
.env                     # Environment variables
.env.example             # Example environment file
.gitignore               # Git ignore file
generate_migration.sh    # Script to generate database migrations
nodemon.json             # Nodemon configuration
package.json             # Project dependencies and scripts
src/
  app.ts                 # Express app setup
  bootstrap.ts           # Application bootstrap logic
  config/
    app-version.config.ts # Application version configuration
    app.config.ts         # General application configuration
  database/
    entities/            # Database entity definitions
    migrations/          # Database migration files
    index.ts             # Database connection setup
  server.ts              # HTTP server setup
  shared/
    helpers/             # Utility functions
    middleware/          # Express middleware
    paystack/            # Paystack integration
    utils/               # General utilities
  v1/
    modules/             # API modules for version 1
tsconfig.json            # TypeScript configuration
```

---

## Features

- **Transaction Management**: Handle transactions, refunds, and pending payments.
- **Vendor Operations**: Calculate vendor payouts and manage payment schedules.
- **Payment Integration**: Integrates with Paystack for payment processing.
- **Database Management**: Uses TypeORM for database operations and migrations.
- **Modular Design**: Organized structure for scalability and maintainability.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Mythrift
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy [`.env.example`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2Fmythrift-payments%2F.env.example%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22632b9583-04b8-4679-940b-f33456f9dfc9%22%5D "/Users/mac/Documents/mythrift-payments/.env.example") to [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2Fmythrift-payments%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22632b9583-04b8-4679-940b-f33456f9dfc9%22%5D "/Users/mac/Documents/mythrift-payments/.env") and update the values as needed.

4. Run database migrations:
   ```bash
   npm run migration:run
   ```

---

## Usage

### Development
Start the development server:
```bash
npm run dev
```

### Production
Build the project and start the server:
```bash
npm run build
npm start
```

---

## Scripts

- `npm run dev`: Start the development server with hot reload.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Start the production server.
- `npm run migration:run`: Run database migrations.
- `npm run migration:generate`: Generate new migration files.

---
