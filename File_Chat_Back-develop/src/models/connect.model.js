'use strict';
module.exports = (sequelize, DataTypes) => {
  // 채팅방에 인증하고 들어온 디바이스 정보
  const connect = sequelize.define(
    'connect',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      device_id: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
      connect_id: {
        type: DataTypes.STRING(255),
        notNull: true,
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
    {
      tableName: 'connect',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  connect.associate = (models) => {
    connect.hasMany(models.device, {
      foreignKey: 'device_id',
      sourceKey: 'device_id',
    });
    connect.belongsTo(models.room, {
      foreignKey: 'room_id',
      sourceKey: 'room_id',
    });
  };

  return connect;
};
