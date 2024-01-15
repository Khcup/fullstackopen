const Sequelize = require('sequelize')
const { DB_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')


const sequelize = new Sequelize(DB_URL , { 
  pool: {
  max: 5 } 
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    console.log(err)
    return process.exit(1)
  }

  return null
}

const migrationConf = {
    migrations: {
      glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  }
    
  const runMigrations = async () => {
    const migrator = new Umzug(migrationConf)
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
      files: migrations.map((mig) => mig.name),
    })
  }

  const rollbackMigration = async () => {
    try {
      await sequelize.authenticate(); // Ensure database connection

      const migrator = new Umzug(migrationConf);
      await migrator.down();
      } catch (error) {
      console.error('Error rolling back migrations:', error);
    }
  };
  
  module.exports = { connectToDatabase, sequelize, rollbackMigration }

