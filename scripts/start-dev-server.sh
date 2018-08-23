#!/bin/bash
#

NODE_ENV=development
nodemon --watch server \
         -r babel-register \
         -r dotenv/config \
         -r make-promises-safe \
         server/runServer.js
