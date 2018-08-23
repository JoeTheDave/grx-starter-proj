module.exports = (server) => {
  server.route({
    method: '*',
    path: '/{p*}',
    handler(request, h) {
      return h.file('./server/index.html');
    },
  });
};
