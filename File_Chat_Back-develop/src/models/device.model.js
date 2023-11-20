'use strict';
module.exports = (sequelize, DataTypes) => {
  // 저장공간을 할당한 디바이스에 대한 토큰
  const device = sequelize.define(
    'device',
    {
      device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      device_token: {
        type: DataTypes.STRING(255),
        allowNull: false, 
      },
      device_type : {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      device_storage : {
        type: DataTypes.BIGINT, 
        allowNull: false,
      },
      device_status : {
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
    {
      tableName: 'device',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  return device;
};
