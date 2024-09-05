#!/bin/bash
# description: This script is used to build the project. it depends on the of the arg 'language' given by build.bash
# trigger: build-scripts/start.bash
# arguments: language (env variable)
# action: start the playwright tests
# return: msg if the test is started or something is missing
# author: jl
# date: 2024-09-01
# version: 1.0.0
# example: bash build-scripts/start.bash de-DE                  

# print out script name
echo -e "\n==== $0 ===="

# split the language argument into country and lang
# and take second part of the language argument
split_language_arg_into_country_and_lang() {
    # how to save the argument in a variable
    # print the argument
    local language=$LANGUAGE
    echo $language | cut -d'-' -f1
}

# get the url from the config
# to install ts-node to : npm install -D ts-node
# Extract the baseURL from playwright.config.json
# Function to get the base URL
get_base_url_from_config() {
     base_url=$(npx ts-node -e 'import config from "./playwright.config.ts";
      console.log(config.use?.baseURL);')
      # if the base_url is empty, exit with message
        if [ -z "$base_url" ]; then
            echo "The base URL is empty. Please provide a valid base URL."
            exit 1
        fi
    echo $base_url
}

# get the lang attribute from the BASE_URL      
# Fetch the HTML content and extract the const country and get the lang attribute (de, en, fr, it, ...)
get_lang_attribute_of_url() {
    # declare the variable
    local lang_attribute
    # get the const country from the URL
    lang_attribute=$(curl -s $1 | sed -n "s/.*const country = '\([^']*\)'.*/\1/p")
    # if the lang_attribute is empty, exit with message
    if [ -z "$lang_attribute" ]; then
        echo "No valid lang attribute exists."
        if [ $(curl -s -o /dev/null -w "%{http_code}" $1) -ne 200 ]; then
            echo "The URL is not reachable."
            exit 1
        fi
        exit 1
    fi
    echo $lang_attribute
}

# check if the current URL is the same as the URL from the config
compare_current_url_with_url_from_config() {
    # q: how to save the return value of a function in a variable
    local language=$(split_language_arg_into_country_and_lang $LANGUAGE)
    local base_url=$(get_base_url_from_config)
    local lang_attribute=$(get_lang_attribute_of_url $base_url)
    echo "The language (arg) is: $language"
    echo "started the shop of:   $(get_lang_attribute_of_url $base_url)"
    if [ "$language" = "$lang_attribute" ]; then
        echo "Starting the tests"
        npx playwright test --ui
    else
        echo "The wrong shop >$lang_attribute< is started. Please start the >$lang_attribute< shop."
        exit 1
    fi
}

# call the function
 compare_current_url_with_url_from_config $LANGUAGE