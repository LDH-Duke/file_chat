'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    'room',
    /* Properties */
    {
      room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      room_name: {
        type: DataTypes.STRING(255),
        notNull: true,
        comment: '',
      },
      room_description: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      room_storage: {
        type: DataTypes.BOOLEAN,
        notNull: true,
        comment: '',
        defaultValue: false,
      },
      room_ftpid: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      room_ftppw: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      room_ftpip: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      room_ftppath: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      room_ftpport: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: '',
        defaultValue: 21,
      },
      room_ftptype: {
        type: DataTypes.ENUM(['ftp', 'sftp']),
        notNull: false,
        comment: '',
        defaultValue: 'ftp',
      },
      room_auth_code: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '인증코드',
        defaultValue: 'authentication_code',
      },
      valid_time: {
        type: DataTypes.DATE,
        notNull: false,
        comment: '인증코드 유효시간',
        defaultValue: null,
      },
    },
    /* options */
    {
      tableName: 'room',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  room.associate = (models) => {
    // room >- user
    room.belongsTo(models.users, {
      foreignKey: 'user_id',
      target: 'user_id',
    });

    // room -< invite
    room.hasMany(models.invite, {
      foreignKey: 'room_id',
      sourceKey: 'room_id',
    });
    // room -< files
    room.hasMany(models.files, {
      foreignKey: 'room_id',
      sourceKey: 'room_id',
    });
  };

  return room;
};
