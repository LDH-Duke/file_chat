'use strict';
module.exports = (sequelize, DataTypes) => {
  const nonUsers = sequelize.define(
    'non_users',
    /* Properties */
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_account: {
        type: DataTypes.STRING(255),
        allowNull: false, 
      },
      room_id : {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      status : {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    /* options */
    {
      tableName: 'non_users',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  nonUsers.associate = (models) => {
    nonUsers.belongsTo(models.room, {
      foreignKey: 'room_id',
      sourceKey: 'room_id',
    });
  };

  return nonUsers;
};
