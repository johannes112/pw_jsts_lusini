#!/bin/bash
# This script is used to build the configuration.
# How to run this script: ./build-scripts/build.bash shop language
# Example: bash build-scripts/build.bash lusini de

# get all the arguments passed to the script
# shop
SHOP=$1
# language
LANGUAGE=$2

# copy the config file to the root directory
cp ./data/config/$SHOP/$LANGUAGE/index.ts ./data/config