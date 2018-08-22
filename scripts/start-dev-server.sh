#!/bin/bash
#

NODE_ENV=development
nodemon --watch serverSrc \
         -r babel-register \
         -r dotenv/config \
         -r make-promises-safe \
         serverSrc/runServer.js
