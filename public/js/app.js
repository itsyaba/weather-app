console.log("client side javascript loaded!!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("messageOne");
const messageTwo = document.getElementById("messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  messageOne.textContent = "LOADING";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?adress=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      }
    });
  });
});
