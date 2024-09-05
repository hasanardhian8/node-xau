module.exports = (sequelize, DataTypes) => {
  const Countdown = sequelize.define(
    "countdown", // Use singular model name
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // References the 'users' table
          key: "id", // References the 'id' column in the 'users' table
        },
      },
      countdown_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      countdownDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      tableName: "countdown", // Specifies the table name explicitly
    }
  );
  return Countdown; // Return the model with a singular name
};
