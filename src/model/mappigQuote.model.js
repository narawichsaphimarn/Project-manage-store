module.exports = (sequelize, Sequelize) => {
  const MappingQuote = sequelize.define("mapping_quote", {
    user_id: {
      type: Sequelize.STRING,
    },
    quote_id: {
      type: Sequelize.STRING,
    },
  });

  return MappingQuote;
};
