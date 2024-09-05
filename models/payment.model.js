module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payment", // Use singular model name
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // References the 'users' table
          key: "id", // References the 'id' column in the 'users' table
        },
      },
      usd: {
        type: DataTypes.FLOAT, // Use FLOAT for decimal numbers
        allowNull: true,
      },
      xau: {
        type: DataTypes.FLOAT, // Use FLOAT for decimal numbers
        allowNull: true,
      },
      total: {
        type: DataTypes.FLOAT, // Use FLOAT for decimal numbers
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "payment", // Specifies the table name explicitly
    }
  );

  return Payment; // Return the model with a singular name
};
