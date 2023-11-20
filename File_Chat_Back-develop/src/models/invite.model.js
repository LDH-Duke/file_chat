'use strict';
module.exports = (sequelize, DataTypes) => {
  const invite = sequelize.define(
    'invite',
    /* Properties */
    {
      invite_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invite_owner: {
        type: DataTypes.BOOLEAN,
        notNull: true,
        comment: '',
        defaultValue: false,
      },
      invite_access: {
        type: DataTypes.BOOLEAN,
        notNull: true,
        comment: '',
        defaultValue: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        comment: '',
      },
      user_id: {
        type: DataTypes.INTEGER,
        notNull: true,
        comment: '',
      },
    },
    /* options */
    {
      tableName: 'invite',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  invite.associate = (models) => {
    // invite >- user
    invite.belongsTo(models.users, {
      foreignKey: 'user_id',
      target: 'user_id',
    });
    // invite >- user
    invite.belongsTo(models.room, {
      foreignKey: 'room_id',
      target: 'room_id',
    });
  };

  return invite;
};
