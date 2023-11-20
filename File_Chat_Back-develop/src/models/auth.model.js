'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth = sequelize.define(
    'auth',
    {
      auth_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      auth_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      valid_time: {
        type: DataTypes.DATE,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // 현재 시간을 기본 값으로 설정
      },
      result: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
    },
    {
      tableName: 'auth',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  auth.associate = (models) => {
    auth.belongsTo(models.room, {
      foreignKey: 'room_id',
      targetKey: 'room_id',
    });
  };

  return auth;
};
