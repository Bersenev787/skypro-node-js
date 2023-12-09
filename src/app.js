const http = require("http");
const getUsers = require("./modules/users");

const ipAddress = "http://127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");
  const isHello = url.searchParams.has("hello");
  const isUsers = url.searchParams.has("users");

  console.log(url.searchParams.keys());
  console.log(url.searchParams.has("users"));

  if (userName && isHello) {
    response.status = 200;
    response.statusMessage = "Ok";
    response.header = "Content-Type: text/plain";
    response.write(`Hello, ${userName}`);
    response.end();

    return;
  }

  if (!userName && isHello) {
    response.status = 400;
    response.statusMessage = "Error";
    response.header = "Content-Type: text/plain";
    response.write(`Enter a name`);
    response.end();

    return;
  }

  if (isUsers) {
    response.status = 200;
    response.statusMessage = "Ok";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  }

  if (!isUsers || !isHello) {
    response.status = 500;
    response.statusMessage = "Server error";
    response.header = "Content-Type: text/plain";
    //просто самопроверка
    response.write("empty answer");
    response.end();

    return;
  }

  response.status = 200;
  response.statusMessage = "Ok";
  response.header = "Content-Type: text/plain";
  response.write("Hello, world!");
  response.end();
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу: ${ipAddress}:${port}`);
});
