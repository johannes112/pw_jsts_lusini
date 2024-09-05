#!/bin/bash
# description: # This script is used to build the configuration. it depends on the of the args 'shop' and 'language' given by cli.
# trigger: package.json
# arguments: language (arg on cli), shop (arg on cli)
# action: export 'language' arg, copy the config to the used dir, call the start script, 
# return: call the start script
# author: jl
# date: 2024-09-01
# version: 1.0.0
# example: bash build-scripts/build.bash lusini_dev de-DE                  

# Print out script name
echo -e "==== $0 ===="
# How to run this script: ./build-scripts/build.bash shop language
# Example: bash build-scripts/build.bash lusini de

# get all the arguments passed to the script
# shop
SHOP=$1
# language
LANGUAGE=$2
export LANGUAGE

# copy the config file to the root directory
echo "copy the config"
cp -nf "./data/config/$SHOP/$LANGUAGE/index.ts" "./data/config"

# call the start.sh script
bash build-scripts/start.bash $SHOP $LANGUAGE

