//npm i express
//npm  init -y
//npm i nodemon package,json iš test pakeisti i "start": "nodemon app.js" ir gali paleisti naudojant npm run start
//////////////importas data//////////////////
const data = require("./data/data");
// console.log(data);
///////////////sukuriamas serveris/////////////////////
const express = require("express");
const { response } = require("express");
const app = express();
//////////////data sukelimas i postman
app.use(express.json());
console.log(data);
app.get("/mano/kelias", (request, response) => {
  response.send(data);
});
/////////////duomenu gavimas pagal id ////////////////////
app.get("/mano/kelias/:id", (request, response) => {
  const items = data.find((item) => item.id === parseInt(request.params.id));
  if (!items) {
    response.status(404).send("Item not found");
  }
  response.send(items);
});
//////////////////duomenu iterpimas /////////////////////////////
app.post("/mano/kelias", (request, response) => {
  const newItem = {
    id: 13,
    title: "Monitor",
  };
  data.push(newItem);
  response.send(data);
});
///////////////////////duomenu pakeitimas/iterpimas per postman///////////
app.put("/mano/kelias/:id", (request, response) => {
  const items = data.find((item) => item.id === parseInt(request.params.id));
  if (!items) {
    response.status(404).send("ID/Item not found");
  }
  items.title = request.body.title;
  response.send(items);
});
//////////////////Duomenu trinimas//////////////////////
app.delete("/mano/kelias/:id", (request, response) => {
  const items = data.find((item) => item.id === parseInt(request.params.id));
  if (!items) {
    response.status(404).send("ID/Item not found");
  }
  const itemIndex = data.indexOf(items);
  data.splice(itemIndex, 1);

  response.send(items);
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server is runing on prot " + PORT);
});
