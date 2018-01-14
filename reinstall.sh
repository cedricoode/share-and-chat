#! /bin/bash

cd android && ./gradlew assembleRelease

cd ..

adb install -r android/app/build/outputs/apk/app-release.apk
