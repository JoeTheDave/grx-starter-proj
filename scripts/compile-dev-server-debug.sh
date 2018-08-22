#!/bin/bash
#

NODE_ENV=development
babel serverSrc \
    --out-dir server-debug \
    --copy-files;
