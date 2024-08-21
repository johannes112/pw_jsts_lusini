#!/bin/bash
# This script is used to build the project.

# get all the arguments passed to the script
# shop
shop=$1
# language
LANGUAGE=$2

# get the url from the config
# npm install -D ts-node
# Extract the baseURL from playwright.config.json
BASE_URL=$(npx ts-node ./build-scripts/getBaseUrl.ts)

# get the lang attribute from the BASE_URL      
# Fetch the HTML content and extract the lang attribute
LANG_ATTRIBUTE=$(curl -s $BASE_URL | sed -n "s/.*const country = '\([^']*\)'.*/\1/p")
echo "started server of: $LANG_ATTRIBUTE"

# compare the first argument with lang attribute and if it matches the start the tests if it is not equal then put a message
if [ "$LANGUAGE" = "$LANG_ATTRIBUTE" ]; then
    echo "Starting the tests"
    npx playwright test --ui
else
    echo "The wrong shop >$LANGUAGE< is started. Please start the >$LANG_ATTRIBUTE< shop."
fi
