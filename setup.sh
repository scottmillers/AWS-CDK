#!/bin/bash
aws configure set aws_access_key_id $AWS_COMM_SANDBOX_ACCESSKEYID
aws configure set aws_secret_access_key $AWS_COMM_SANDBOX_SECRETACCESSKEY
aws configure set region us-east-1