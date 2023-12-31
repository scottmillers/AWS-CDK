#!/bin/bash
# Run the default input file that comes with WGS 

RUNDIR=/data


S3_DIR=s3://804609861260-bioinformatics-infectious-disease/
S3_DATA_FILE=$S3_DIR/WGS/SampleFiles/NBSWGS2022007_unmapped.bam
S3_CONFIG_FILE=$S3_DIR/WGS/SamplesFiles/NBSWGS2022007_dragen_haplo3.json
S3_OUTPUT_DIR=$S3_DIR/WGS/Results/



WGSDIR='warp-WholeGenomeGermlineSingleSample_v3.1.10/pipelines/broad/dna_seq/germline/single_sample/wgs/'
INPUT_FILE='/data/NBSWGS2022007_dragen_haplo3.json'

cd $RUNDIR

#chown -R ubuntu .

# Install the Broad Institute WholeGenomeGermlineSingleSample
wget  https://github.com/broadinstitute/warp/archive/refs/tags/WholeGenomeGermlineSingleSample_v3.1.10.tar.gz 

tar xzf WholeGenomeGermlineSingleSample_v3.1.10.tar.gz 

# Download the WGS Config json
aws s3 cp $S3_CONFIG_FILE .

# Download the .bam file
aws s3 cp $S3_INPUT_FILE .  





