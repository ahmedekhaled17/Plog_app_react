import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
    users: 600,
    posts: 640
});

server.db = router.db;

server.use(cors());
server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running on port 3000');
});
