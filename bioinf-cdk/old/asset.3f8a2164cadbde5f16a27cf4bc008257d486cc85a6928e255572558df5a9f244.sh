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


# create the docker group
groupadd docker
# add ec2-user to the docker group so you can execute Docker commands without sudo
usermod -aG docker ec2-user

newgrp docker


# gcc required for miniwld
yum install gcc python3-devel

# install git
yum install git

# install go for wreleaser
#yum install go

# install miniwdl
pip3 install miniwdl






# Tests 
# verify python install 
# python3 --version 
# verify docker installed
# docker info
# docker run hello-world
# verify miniwdl installed
# miniwdl run_self_test
