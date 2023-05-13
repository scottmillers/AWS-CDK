!/bin/bash
# Script to install miniwdl on Ubuntu
# Known to work on Ubuntu 22.04.2 LTS


# Docs on how to install Docker on ubuntu
#https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04

# Step 1 - Update the apt package index
apt update -y

# Step 2 - Install prerequisites
apt install apt-transport-https ca-certificates curl software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update -y

apt-cache policy docker-ce -y

# Now install docker
apt install docker-ce -y

# Setup docker so ubuntu user can run it
sudo usermod -aG docker ubuntu

# Docker End

# Now install PIP3 so I can install miniwdl
apt install python3-pip -y

pip3 install miniwdl
~                       
# Note I only get warnings that scripts are not on the path.  Messages are
# /home/ubuntu/.local/bin is not on the path
# put this on the command line
#export PATH="$HOME/.local/bin:$PATH"











