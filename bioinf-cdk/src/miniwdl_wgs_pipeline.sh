#!/bin/bash
# Run the default input file that comes with WGS 
DIR='warp-WholeGenomeGermlineSingleSample_v3.1.10/pipelines/broad/dna_seq/germline/single_sample/wgs/'
INPUT_FILE='input_files/WholeGenomeGermlineSingleSample.inputs.plumbing.masked_reference.json'
cd $DIR
miniwdl run WholeGenomeGermlineSingleSample.wdl -i $INPUT_FILE

