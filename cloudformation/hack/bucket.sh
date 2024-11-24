#!/bin/sh

set -xe

aws s3 mb "s3://platform-infrastructure-on-aws-cf-$(whoami)" --profile ${PROFILE}
