!/bin/bash
# Script to install miniwdl on Ubuntu
# Known to work on Ubuntu 22.04.2 LTS


# Docs on how to install Docker on ubuntu
#https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04

# Step 1 - Update the apt package index
apt update -y

# Step 2 - Install prerequisites for Docker
apt install apt-transport-https ca-certificates curl software-properties-common -y

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update -y

apt-cache policy docker-ce -y

# Step 3 - Install docker
apt install docker-ce -y

# Setup docker so user ubuntu can run it
usermod -aG docker ubuntu

# Docker End

# Step4 - Install Miniwdl prerequisites
apt install python3-pip -y

# Step4 - Install PIP3 package manager needed for miniwdl
pip3 install miniwdl


# Step5 - Create a data drive and mount it
sudo file /dev/nvme1n1
sudo mkfs –t ext4 /dev/nvme1n1
sudo mkdir /data
sudo mount /dev/nvme1n1 /data

# Step 
# Step 6 - Install the WholeGenomeGermlineSingleSample
# Use the /data directory
cd /data

# Now install GoLang for wreleaser
#apt instal go-golang

# Install wreleaser
#go install github.com/broadinstitute/warp/wreleaser@latest

# Install the Broad Institute WholeGenomeGermlineSingleSample
wget  https://github.com/broadinstitute/warp/archive/refs/tags/WholeGenomeGermlineSingleSample_v3.1.10.tar.gz 

tar xzf WholeGenomeGermlineSingleSample_v3.1.10.tar.gz 

chown -R ubuntu .










