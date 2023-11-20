'use strict';
module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define(
    'files',
    /* Properties */
    {
      file_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file_saveId: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      file_name: {
        type: DataTypes.STRING(255),
        notNull: true,
        comment: '',
      },
      file_path: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      file_exp: {
        type: DataTypes.STRING(45),
        notNull: false,
        comment: '',
      },
      file_size: {
        type: DataTypes.INTEGER,
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
      chat_id: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: '',
      },
      device_id: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: '',
      },
    },
    /* options */
    {
      tableName: 'files',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  files.associate = (models) => {
    // files >- user
    files.belongsTo(models.users, {
      foreignKey: 'user_id',
      target: 'user_id',
    });
    // files >- user
    files.belongsTo(models.room, {
      foreignKey: 'room_id',
      target: 'room_id',
    });
    // files >- chat
    files.belongsTo(models.chat, {
      foreignKey: 'chat_id',
      target: 'chat_id',
    });
    // files >- device
    files.belongsTo(models.device, {
      foreignKey: 'device_id',
      target: 'device_id',
    });
  };

  return files;
};
