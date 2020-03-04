import { server } from './server';

const port = 3000;

server.listen(port);

// eslint-disable-next-line no-console
console.log(`server started at: ${port}`);
