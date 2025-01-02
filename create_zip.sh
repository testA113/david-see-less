#!/usr/bin/env bash
cd ..
zip -r david-see-less.zip david-see-less -x "*.DS_Store" -x "*.git*" -x "*.idea*"
cd david-see-less
