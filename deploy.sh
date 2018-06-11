#!/bin/bash

SRV=procivis

# zip
rm wib.zip
cp build/bundle.js .
zip -r wib.zip . -x node_modules\* .git\* build\* wib\*zip

# upload
scp wib.zip $SRV:/var/www/flowers

# unpack
ssh $SRV "cd /var/www/flowers ; unzip wib.zip"
