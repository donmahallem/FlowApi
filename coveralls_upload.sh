#!/bin/bash
if [ "$TEST_SUITE" == "unit" ]; then
    npm install coveralls --no-save -g
    cat ./coverage/lcov.info | coveralls -v
fi
