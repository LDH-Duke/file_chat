'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    /* Properties */
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING(255),
        notNull: true,
        comment: '',
      },
      user_account: {
        type: DataTypes.STRING(255),
        notNull: true,
        comment: '',
      },
      user_pw: {
        type: DataTypes.STRING(255),
        notNull: true,
        comment: '',
      },
    },
    /* options */
    {
      tableName: 'users',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  users.associate = (models) => {
    users.hasMany(models.room, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
    users.hasMany(models.invite, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
  };

  return users;
};
