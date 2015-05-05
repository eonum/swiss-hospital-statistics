#!/bin/bash

BUILD_PATH='build'
ASSETS_PATH='app/assets/javascripts'
VENDOR_PATH='vendor/assets/javascripts'
LIB_PATH=${BUILD_PATH}'/lib'
CONFIG_PATH=${BUILD_PATH}'/config'
CSS_PATH='app/assets/stylesheets'
CSS_NAME='application.css'
SOURCE_PATH=( ${ASSETS_PATH} ${VENDOR_PATH} ${LIB_PATH} ${CONFIG_PATH} ${CSS_PATH})

BUILD_TMP_PATH='build_tmp'

echo 'Preparing temp folder...'
echo '  removing old caches'
[ -d ${BUILD_TMP_PATH} ] && rm -rf ${BUILD_TMP_PATH}
echo "  creating directories"
mkdir -p ${BUILD_TMP_PATH}
echo '  done'

echo 'Copying sources...'
for each in "${SOURCE_PATH[@]}"
do
    echo "  copying ${each}"
    cp -rf ${each}'/.' ${BUILD_TMP_PATH}'/'
done
echo '  done'

echo 'Compiling JS...'
node ${BUILD_TMP_PATH}'/r.js' -o ${BUILD_TMP_PATH}'/build.js';
echo '  done'

echo 'Compiling CSS...'
sass --update ${BUILD_TMP_PATH}'/'${CSS_NAME}'.scss':${BUILD_TMP_PATH}'/'${CSS_NAME}
node ${BUILD_TMP_PATH}'/r.js' -o ${BUILD_TMP_PATH}'/build.css.js';
echo '  done'

echo 'Removing caches...'
[ -d ${BUILD_TMP_PATH} ] && rm -rf ${BUILD_TMP_PATH}
echo '  done'