#!/bin/bash
#

NODE_ENV=development
nodemon --watch src/serverSrc \
         -r babel-register \
         -r dotenv/config \
         -r make-promises-safe \
         src/serverSrc/runServer.js
