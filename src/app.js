const http = require("http");
const getUsers = require("./modules/users");
const { error } = require("console");

const ipAddress = "http://127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, ipAddress);
  const userName = url.searchParams.get("hello");

  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "Ok";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, ${userName}`);
    response.end();

    return;
  }

  switch (request.url) {
    case "/users":
      response.statusCode = 200;
      response.statusMessage = "Ok";
      response.setHeader("Content-Type", "application/json");
      response.write(getUsers());
      response.end();
      break;

    case "/?hello":
    case "/?hello=":
      response.statusCode = 400;
      response.statusMessage = "Bad request";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Enter a name`);
      response.end();
      break;

    case "/":
      response.statusCode = 200;
      response.statusMessage = "Ok";
      response.setHeader("Content-Type", "text/plain");
      response.write("Hello, world!");
      response.end();
      break;

    case "/favicon.ico":
      // авторматически срабатывает запрос за фавиконкой для отрисовки ее во вкладке
      // обрабатываем этот запрос, иначе в консоль падает 500
      response.statusCode = 204;
      response.write("No content");
      response.end();
      break;

    default:
      response.statusCode = 500;
      response.statusMessage = "Internal Server Error";
      response.setHeader("Content-Type", "text/plain");
      response.write("Empty message");
      response.end();
      break;
  }
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу: ${ipAddress}:${port}`);
});
