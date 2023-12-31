import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface MultistackProps extends cdk.StackProps {
  vpc?: ec2.Vpc | null;
  env: {};
}
