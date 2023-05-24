import {Stack, StackProps} from "aws-cdk-lib";
import {Role, ServicePrincipal, PolicyStatement, Effect} from "aws-cdk-lib/aws-iam";
import {Bucket, IBucket} from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class OmicsCdkStack extends Stack {
  sourceBucket: IBucket;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Find the Omics bucket
    this.sourceBucket = Bucket.fromBucketAttributes(
      this,
      "OmicsBucketS3",
      {
        bucketArn:
          "arn:aws:s3:::804609861260-bioinformatics-infectious-disease",
      }
    );

    // setup the Omics role so it can read/write from my S3 bucket write to a omics log file
    const role = new Role(this, "OmicsRole", {
      assumedBy: new ServicePrincipal("omics.amazonaws.com"),
    });

    role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["omics:*"],
        resources: ["*"],
      })
    );

    role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:ListBucket", "s3:GetObject", "s3:PutObject"],
        resources: [this.sourceBucket.bucketArn],
      })
    );

    role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          "logs:DescribeLogStreams",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        resources: [
          "arn:aws:logs:us-east-1:588459062833:log-group:/aws/omics/WorkflowLog:log-stream:*",
        ],
      })
    );

    role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["logs:CreateLogGroup"],
        resources: [
          "arn:aws:logs:us-east-1:588459062833:log-group:/aws/omics/WorkflowLog:*",
        ],
      })
    );
  }
}
