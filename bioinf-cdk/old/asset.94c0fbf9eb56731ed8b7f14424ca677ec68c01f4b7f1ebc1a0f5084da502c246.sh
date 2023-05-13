#!/bin/bash
yum update -y

# Install miniwdl
# https://miniwdl.readthedocs.io/en/latest/getting_started.html

# Install docker
# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html
amazon-linux-extras install docker

# start docker
service docker start

# Make sure docker daemon starts after reboot
systemctl enable docker


# add ec2-user to the docker group so you can execute Docker commands without sudo
usermod -a -G docker ec2-user
# update group with changes 
#newgrp docker


# gcc required for miniwld
yum install gcc python3-devel

# install miniwdl
pip3 install miniwdl

# Tests 
# verify python install 
# python3 --version 
# verify docker installed
# docker info
# verify miniwdl installed
# miniwdl run_self_test
