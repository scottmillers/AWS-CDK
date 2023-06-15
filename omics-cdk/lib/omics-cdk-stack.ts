import {Stack, StackProps, CfnOutput} from "aws-cdk-lib";
import {Role, ServicePrincipal, PolicyStatement, Effect} from "aws-cdk-lib/aws-iam";
import {Bucket, IBucket} from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class OmicsCdkStack extends Stack {
  sourceBucket: IBucket;
 
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const roleName = 'OmicsR2RWorkflowRole'
    
    
    // setup the Omics role so it can read/write from my S3 bucket write to a omics log file
    const role = new Role(this, "OmicsRole", {
      roleName: roleName,
      assumedBy: new ServicePrincipal("omics.amazonaws.com"),
    });
    
 

    role.assumeRolePolicy?.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['sts:AssumeRole'],
        principals: [new ServicePrincipal('omics.amazonaws.com')], // Specify the service principal allowed to assume the role
    }));
    
    
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
        actions: [
          "omics:*",
          "ram:AcceptResourceShareInvitation",
          "ram:GetResourceShareInvitations"
          ],
        resources: ["*"],
      })
    );
    

   /*
    role.addManagedPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new ServicePrincipal("omics.amazonaws.com")], 
        actions: ["sts:AssumeRole"],
      })
    );
  */
    
    
    role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:ListBucket", 
                  "s3:GetObject", 
                  "s3:PutObject",
                  "s3:AbortMultipartUpload",
                  "s3:ListMultipartUploadParts",
                  "s3:GetObjectAcl",
                  "s3:PutObjectAcl"
                  ],
        resources: ["arn:aws:s3:::804609861260-bioinformatics-infectious-disease/*",
                    "arn:aws:s3:::sentieon-omics-license-us-east-1/*",
                    "arn:aws:s3:::omics-us-east-1/*"],
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
    
      // Create outputs for connecting
    new CfnOutput(this, 'Omics Role Name', { value: role.roleName});
    new CfnOutput(this, 'Omics Role Arn', { value: role.roleArn });
    
    //new cdk.CfnOutput(this, 'IP Address', { value: ec2Instance.instancePublicIp });
    
    
  }
}