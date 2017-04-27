'use strict'

module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('pet', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['dog', 'cat', 'minx']
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  return Pet;
};
