module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres', 
  senha: 'docker', 
  database: 'baseGoBarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}