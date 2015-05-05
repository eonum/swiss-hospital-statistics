#!/bin/bash

BUILD_PATH='build'
ASSETS_PATH='app/assets/javascripts'
VENDOR_PATH='vendor/assets/javascripts'
LIB_PATH=${BUILD_PATH}'/lib'
CONFIG_PATH=${BUILD_PATH}'/config'
SOURCE_PATH=( ${ASSETS_PATH} ${VENDOR_PATH} ${LIB_PATH} ${CONFIG_PATH})

BUILD_TMP_PATH='build_tmp'

echo 'Started preparing temp folder...'
echo '  removing old caches'
[ -d ${BUILD_TMP_PATH} ] && rm -rf ${BUILD_TMP_PATH}
echo "  creating directories"
mkdir -p ${BUILD_TMP_PATH}
echo '  done'

echo 'Started copying sources...'
for each in "${SOURCE_PATH[@]}"
do
    echo "  copying ${each}"
    cp -rf ${each}'/.' ${BUILD_TMP_PATH}'/'
done
echo '  done'

node ${BUILD_TMP_PATH}'/r.js' -o ${BUILD_TMP_PATH}'/build.js';
echo '  removing caches'
[ -d ${BUILD_TMP_PATH} ] && rm -rf ${BUILD_TMP_PATH}