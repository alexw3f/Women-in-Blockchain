#!/bin/bash

rm wib.zip
cp build/bundle.js .
zip -r wib.zip . -x node_modules\* .git\*
