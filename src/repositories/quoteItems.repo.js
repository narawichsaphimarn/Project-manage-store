exports.findAllByQuoteId = (uuid) => {
  let response;
  try {
    response = quote
      .findAll({
        where: {
          quote_id: uuid,
        },
      })
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  } catch (error) {
    console.error(error);
    response = error;
  }
  return response;
};
