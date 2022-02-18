const getSubscriptionRequest = (email, name) => {
  const url = "https://story.madfish.solutions/";
  const data = new URLSearchParams(
    `NAME=${
      name || email
    }&EMAIL=${email}&_mc4wp_honeypot=&_mc4wp_timestamp=1645177659&_mc4wp_form_id=665&_mc4wp_form_element_id=mc4wp-form-1`
  );
  const config = {
    method: "POST",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language":
        "en,ru;q=0.9,de;q=0.8,pt;q=0.7,tr;q=0.6,en-US;q=0.5,tk;q=0.4,ru-UA;q=0.3,ru-RU;q=0.2",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      pragma: "no-cache",
      "upgrade-insecure-requests": "1",
    },
    body: data,
  };
  return { data, url, config };
};

module.exports = {
  getSubscriptionRequest,
};
