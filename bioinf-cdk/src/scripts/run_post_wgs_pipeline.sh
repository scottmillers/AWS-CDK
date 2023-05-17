#!/bin/bash
# Run the default input file that comes with WGS 

RUNDIR=/data


NOW=$(date +"%Y-%m-%d-%H.%M.%S")

S3_OUTPUT_DIR=$S3_DIR/WGS/Results/$NOW/
LOCAL_OUTPUT_DIR=_LAST



# Copy the results back
#aws s3 cp $LOCAL_OUTPUT_DIR $S3_OUTPUT_DIR --recursive --dryrun 
aws s3 cp $LOCAL_OUTPUT_DIR $S3_OUTPUT_DIR --recursive