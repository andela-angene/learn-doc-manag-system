'use strict'

const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.owners = require('../models/owners.js')(sequelize, Sequelize);
db.pets = require('../models/pets.js')(sequelize, Sequelize);

//Relations
db.pets.belongsTo(db.owners);
db.owners.hasMany(db.pets);

// Create new User
// db.owners.create({
//   name: 'Tony',
//   role: 'user'
// })
// .then(newUser => {
//   console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
// })

// Create new Cat
// db.pets.create({
//   name: 'Doggy',
//   owner_id: 'e340765f-8995-4955-800b-b981b34f02ae',
//   type: 'dog'
// })
// .then(newPet => {
//   console.log(`new pet ${newPet.name} created, type: ${newPet.type} and id: ${newPet.id}`);
// });

// Read Users
// db.owners.findAll({})
// .then(users => {
//   users.forEach((user) => console.log(user.name));
// });

// Update User
// db.owners.update({name: 'ads!'}, {where: {name: 'Tony'}})
// .then(updated => console.log(updated));

// Delete User
// db.owners.destroy({
//   where: {name: 'Loren'}
// })
// .then(deleteStatus => console.log(deleteStatus));


module.exports = db;
