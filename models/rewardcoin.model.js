module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define(
    "reward", // Use singular model name
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // References the 'users' table
          key: "id", // References the 'id' column in the 'users' table
        },
      },
      coin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      totalcoin: {
        type: DataTypes.INTEGER, // Use FLOAT for decimal numbers
        allowNull: true,
      },
    },
    {
      tableName: "reward", // Specifies the table name explicitly
    }
  );

  return Reward; // Return the model with a singular name
};
