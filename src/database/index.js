import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import databaseConfig from '../config/database'

import User  from '../app/models/User'
import File  from '../app/models/File'
import Appointments from '../app/models/Appointments'

const models = [User, File, Appointments]

class Database {
  constructor() {
    this.init();
    this.mongo()
  }

  init() {  
    this.connection = new Sequelize(databaseConfig);

    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models))
  }

  mongo() {
    const options = {
      useNewUrlParser: true,
      useFindAndModify: true,
    };
    const url = 'mongodb://localhost:27017/gobarber'
    this.mongooseConnection = mongoose.connect(
      url, options
    )
  }
}

export default new Database();