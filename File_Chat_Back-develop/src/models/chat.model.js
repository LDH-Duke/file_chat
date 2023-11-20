'use strict';
module.exports = (sequelize, DataTypes) => {
  const moment = require('moment');
  const chat = sequelize.define(
    'chat',
    /* Properties */
    {
      chat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_msg: {
        type: DataTypes.STRING(255),
        notNull: true,
        comment: '',
      },
      chat_date: {
        type: 'TIMESTAMP',
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
        notNull: false,
        comment: '',
      },
      user_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        comment: '',
      },
      room_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        comment: '',
      },
      file_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        comment: '',
      },
    },
    /* options */
    {
      tableName: 'chat',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  chat.associate = (models) => {
    // chat >- user
    chat.belongsTo(models.users, {
      foreignKey: 'user_id',
      target: 'user_id',
    });
    // chat >- user
    chat.belongsTo(models.room, {
      foreignKey: 'room_id',
      target: 'room_id',
    });

    // chat -< files
    chat.hasMany(models.files, {
      foreignKey: 'chat_id',
      sourceKey: 'chat_id',
    });
  };

  return chat;
};
