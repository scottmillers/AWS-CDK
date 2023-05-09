#!/bin/bash
#Mount the data volume
#lsblk
#file /dev/nvme1n1
mkfs –t ext4 /dev/nvme1n1
mkdir /data
mount /dev/nvme1n1 /data
#cd /data
#df –h .
