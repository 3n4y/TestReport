#!/bin/bash

[[ ! -z "$1" ]] && BUILDFILE=$1 || BUILDFILE=./buildspec.yml

./codebuild_build.sh \
 -i aws/codebuild/standard:4.0 \
 -a ./artifact \
 -s `pwd` \
 -c \
 -b $BUILDFILE \
 -m \
 -l amazon/aws-codebuild-local:aarch64

