#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CompleteStack } from "../lib/complete-cdk-stack";
import { MultistackProps } from "../lib/multistackprops-cdk-interface";
import { Ec2Stack } from "../lib/ec2-cdk-stack";

const app = new cdk.App();

/*  This is splitting the App across multiple stacks
// Specify the AWS account and region in the env object
const account = "588459062833";
const region = "us-east-1";

const myProps: MultistackProps = {
  vpc: null,
  env: { account, region },
};

const name = "LearnCdk"
// setup the network
const network = new NetworkStack(app, name, myProps);

// add the ec2s to the network
const ec2 = new Ec2Stack(app, name, myProps);
*/

const all = new CompleteStack(app, "LearnCdkStack", {
  stackName: "Learn-Cdk-Stack",
  description: "A stack to help me learn AWS CDK ",
});
