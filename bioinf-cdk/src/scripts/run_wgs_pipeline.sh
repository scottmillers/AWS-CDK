#!/bin/bash
# Run the default input file that comes with WGS 

RUNDIR=/data


WGSDIR='warp-WholeGenomeGermlineSingleSample_v3.1.10/pipelines/broad/dna_seq/germline/single_sample/wgs/'
INPUT_FILE='/data/NBSWGS2022007_dragen_haplo3.json'

cd $RUNDIR


#cd $DIR
nohup miniwdl run $WGSDIR/WholeGenomeGermlineSingleSample.wdl -i $INPUT_FILE & disown






