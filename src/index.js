const { application, request } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json())

const customers = [];

// Creatae account
app.post("/account", (request, response) => {
  const {cpf, name} = request.body;

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if(customerAlreadyExists)
    return response.status(400).json({"message": "User already exists"});

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
})

// Search statemen
app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if(customer)
    return response.status(200).json(customer.statement);
  
  return response.status(400).json({error: "Customer not found"});
});

app.listen(3333, () => console.log('Server running at port 3333'));