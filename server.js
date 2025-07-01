import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db_updated.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom header middleware
server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
