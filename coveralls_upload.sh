#!/bin/bash
if [ "$TEST_SUITE" == "unit" ]; then
    npm install coveralls --no-save
    cat ./coverage/lcov.info | coveralls -v
fi