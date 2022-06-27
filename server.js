import * as http from 'http';

const getResponseText = (userAgent) => (`
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <title>From Node with love!</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <h1>Привет!</h1>
      <p>Ты используешь: ${userAgent}.</p>
    </body>
  </html>
`);

const onClientConnect = (req, res) => {
  const HTTP_SUCCESS_CODE  = 200;
  const HTTP_NOT_FOUND_CODE = 404;

  const styles = `
    h1 {
      color: red;
      font-size: 24px;
    }

    p {
      color: green;
      font-size: 16px;
    }`;

  let userAgent;
  let responseText;

  switch (req.url) {
    case '/style.css':
      res.writeHead(HTTP_SUCCESS_CODE, {
        'Content-Type': 'text/css; charset=UTF-8',
      });

      res.end(styles);
      break;

    case '/':
      userAgent = req.headers['user-agent'];
      responseText = getResponseText(userAgent);

      res.writeHead(HTTP_SUCCESS_CODE, {
        'Content-Type': 'text/html; charset=UTF-8',
      });

      res.end(responseText);
      break;

    default:
      res.writeHead(HTTP_NOT_FOUND_CODE, {
        'Content-Type': 'text/plain; charset=UTF-8',
      });
      res.end('Упс, ничего не найдено :(');
  }
};

const port = 8000;

const httpServer = http.createServer(onClientConnect);

httpServer.listen(port, () => {
  console.info(`Принимаю подключения на порт ${port}`);
});

httpServer.on('error', ({message}) => {
  console.error(`Ошибка: ${message}`);
});
