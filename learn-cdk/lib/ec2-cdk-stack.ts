import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";
import { MultistackProps } from "./multistackprops-cdk-interface";

export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MultistackProps) {
    super(scope, id, props);

    const vpc = props.vpc;

    if (vpc == null) {
      console.error("VPC is null:");
      return;
    }

    // Select subnets from the VPC based on specific criteria
    const subnets = vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, // Filter by subnet type (PRIVATE, PUBLIC, ISOLATED)
      onePerAz: true, // Ensures only one subnet is selected per Availability Zone
    });

    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "yum update -y",
      "yum install -y httpd",
      "systemctl start httpd",
      "systemctl enable httpd",
      "echo '<h1>Hello World from $(hostname -f)</h1>' > /var/www/html/index.html"
    );

    const ami = ec2.MachineImage.latestAmazonLinux2;

    // Create the instance using the Security Group, AMI, and KeyPair defined in the VPC created
    const myInstance = new ec2.Instance(this, "Demo-Application", {
      instanceName: "DemoEc2",
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),

      machineImage: ec2.MachineImage.latestAmazonLinux2(),

      blockDevices: [
        {
          deviceName: "/dev/sda1", // Use the root device name from Step 1
          volume: ec2.BlockDeviceVolume.ebs(2048, {
            deleteOnTermination: true,
          }),
        },
      ],
    });
  }
}
