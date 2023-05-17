#!/bin/bash
#Run a miniwdl sample file


echo 'Downloading data file'
wget -nv -O - https://github.com/broadinstitute/viral-pipelines/archive/v2.1.0.2.tar.gz | tar zx

cd viral-pipelines-*

echo 'Run miniwdl'
miniwdl run pipes/WDL/workflows/assemble_refbased.wdl   \
    reads_unmapped_bams=test/input/G5012.3.testreads.bam  \
    reference_fasta=test/input/ebov-makona.fasta          \
    sample_name=G5012.3 --verbose
