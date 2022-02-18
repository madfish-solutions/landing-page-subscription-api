const getSubscriptionRequest = (email, name) => {
  const data = JSON.stringify({
    NAME: name || email,
    EMAIL: email,
  });
  const url = "https://story.madfish.solutions/madfish-subscription-form/";
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  return { data, url, config };
};

module.exports = {
  getSubscriptionRequest,
};
