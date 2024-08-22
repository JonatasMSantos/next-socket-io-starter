import { createServer } from 'http';
import next from 'next';
import socketIo from 'socket.io';
import { parse } from 'url';

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url as string, true);
    handle(req, res, parsedUrl);
  });

  const io = new socketIo.Server(server);

  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  const PORT: string | number = process.env.PORT || 3000;
  server.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${PORT}`);
  });

  module.exports = { io };
}); 
