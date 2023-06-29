import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class LearnCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //const stack = new NetworkStack(scope, 'MyStack');

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'LearnCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
