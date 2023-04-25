#!/bin/bash
#Run a miniwdl sample file
cd warp-WholeGenomeGermlineSingleSample_v3.1.10/pipelines/broad/dna_seq/germline/single_sample/wgs
miniwdl run WholeGenomeGermlineSingleSample.wdl -i input_files WholeGenomeGermlineSingleSample.inputs.plumbing.masked_reference.json
