// models/User.js
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refcoduser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refcodtarget: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "users", // Specifies the table name explicitly
    }
  );

  return Users;
};
