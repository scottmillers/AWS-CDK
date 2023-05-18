#!/bin/bash
yum update -y

# Install miniwdl
# https://miniwdl.readthedocs.io/en/latest/getting_started.html

# Install docker
# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html
amazon-linux-extras install docker


# create the docker group
groupadd docker
# add ec2-user to the docker group so you can execute Docker commands without sudo
usermod -aG docker ec2-user


# start docker
service docker start

# Make sure docker daemon starts after reboot
systemctl enable docker


# new way to install python from this article
# https://tecadmin.net/install-python-3-7-amazon-linux/
# I did this since I had issues with openssl version and miniwdl
#yum install gcc openssl-devel bzip2-devel libffi-devel

#cd /opt
#sudo wget https://www.python.org/ftp/python/3.7.9/Python-3.7.9.tgz


#sudo tar xzf Python-3.7.9.tgz


#cd Python-3.7.9
#sudo ./configure --enable-optimizations
#sudo make altinstall

#sudo rm /usr/src/Python-3.7.9.tgz


# gcc required for miniwld
#yum install gcc python3-devel

# install git
yum install git

# install go for wreleaser
#yum install go

# install miniwdl
#pip3 install miniwdl







