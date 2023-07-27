import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class CompleteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Create a VPC

    const vpc = new ec2.Vpc(this, "DemoVPC", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"), // Specify the desired CIDR block for the VPC
      maxAzs: 1, // Specify the maximum number of availability zones to use
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "application",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 28,
          name: "rds",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Create a new security group allowing inbound SSH traffic (port 22)
    const securityGroup = new ec2.SecurityGroup(this, "InstanceSecurityGroup", {
      vpc: vpc,
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "SSH access"
    );

    // Create the EC2 instance
    const ec2Instance = new ec2.Instance(this, "MyApplicationServer", {
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),

      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpc: vpc,
      securityGroup,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    // Access the created VPC properties
    console.log("VPC ID:", vpc.vpcId);
    console.log(
      "Public Subnets:",
      vpc.publicSubnets.map((subnet) => subnet.subnetId)
    );
    console.log(
      "Private Subnets:",
      vpc.privateSubnets.map((subnet) => subnet.subnetId)
    );
  }
}
