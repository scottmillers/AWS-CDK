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

# finally miniwdl
pip3 install miniwdl

# Now install GoLang for wreleaser
#apt instal go-golang

# Install wreleaser
#go install github.com/broadinstitute/warp/wreleaser@latest

#

# Install the Broad Institute WholeGenomeGermlineSingleSample
cd /home/ubuntu

wget  https://github.com/broadinstitute/warp/archive/refs/tags/WholeGenomeGermlineSingleSample_v3.1.10.tar.gz

tar –xz /home/ubuntu/WholeGenomeGermlineSingleSample_v3.1.10.tar.gz 

chown -R ubuntu .












