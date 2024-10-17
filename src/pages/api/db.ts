import { Sequelize } from 'sequelize';
import { config } from '../config/config';
import { initMySQLModels } from '@/pages/models';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const dbConfiguration = {
    ...dbConfig,
    database: undefined,
    logging: true
}

let sequelize: Sequelize | null = null;

const initializeDatabase = async () => {
    if (!sequelize) {
        sequelize = new Sequelize(dbConfiguration);

        // Create the database if it doesn't exist
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
        console.log(`Database ${dbConfig.database} created or already exists.`);

        // Now create a new Sequelize instance with the specified database
        sequelize = new Sequelize(dbConfig);
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Initialize models here or in a separate init function
        initMySQLModels(sequelize);
        await sequelize.sync({ alter: true });
        
        console.log('Database synchronized successfully.');
    }
    return sequelize;
};

// Export the initialize function
export { initializeDatabase };

