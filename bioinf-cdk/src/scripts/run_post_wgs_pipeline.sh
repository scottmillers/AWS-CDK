#!/bin/bash
# Run the default input file that comes with WGS 

RUNDIR=/data


NOW=$(date +"%Y-%m-%d-%H.%M.%S")

S3_DIR=s3://804609861260-bioinformatics-infectious-disease/
S3_DATA_FILE=$S3_DIR/SampleFiles/NBSWGS2022007_unmapped.bam
S3_CONFIG_FILE=$S3_DIR/SamplesFiles/NBSWGS2022007_dragen_haplo3.json
S3_OUTPUT_DIR=$S3_DIR/SampleFiles/Results/$NOW/
LOCAL_OUTPUT_DIR=_LAST




# Copy the results back
#aws s3 cp $LOCAL_OUTPUT_DIR $S3_OUTPUT_DIR --recursive --dryrun 
aws s3 cp $LOCAL_OUTPUT_DIR $S3_OUTPUT_DIR --recursive