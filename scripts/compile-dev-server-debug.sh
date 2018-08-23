#!/bin/bash
#

NODE_ENV=development
babel server \
    --out-dir server-debug \
    --copy-files;
