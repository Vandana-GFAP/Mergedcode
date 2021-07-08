const ServiceApp = () => {
  let serviceUrl = `${process.env.PUBLIC_URL}/service.js`;
  navigator.serviceWorker
    .register(serviceUrl)
    .then((response) => {
      console.log("response");
    })
    .catch(function(err) {
      console.log("error: ", err);
    });
};
export default ServiceApp;
