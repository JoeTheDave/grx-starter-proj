#!/bin/bash
#

NODE_ENV=development
babel src/serverSrc \
    --out-dir server-debug \
    --copy-files;
