import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class NetworkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, "DemoVPC", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"), // Specify the desired CIDR block for the VPC
      maxAzs: 2, // Specify the maximum number of availability zones to use
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "ingress",
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

    /*
    // Create a public subnet and attach to VPC
    const publicSubnet = new ec2.PublicSubnet(stack, "ingress", {
      vpcId: vpc.vpcId,
      cidrBlock: "10.0.0.0/24", // Specify the desired CIDR block for the subnet
      availabilityZone: "us-east-1a"
    });
*/

    // this is how you add tags
    /*   const internetGateway = new ec2.CfnInternetGateway(
      this,
      "MyCfnInternetGateway",
      // all optional props  {
        tags: [
          {
            key: "Mytag",
            value: "Myvalue",
          },
        ],
      }
    );

    // Attach the Internet Gateway to the VPC
    const gatewayAttachment = new ec2.CfnVPCGatewayAttachment(
      this,
      "MyGatewayAttachment",
      {
        vpcId: vpc.vpcId,
        internetGatewayId: internetGateway.ref,
      }
    );

    // Create a route table
    const routeTable = new ec2.CfnRouteTable(this, "MyRouteTable", {
      vpcId: vpc.vpcId,
    });

    // Create a route to the Internet Gateway
    const internetRoute = new ec2.CfnRoute(this, "MyInternetRoute", {
      routeTableId: routeTable.ref,
      destinationCidrBlock: "0.0.0.0/0",
      gatewayId: internetGateway.ref,
    });
*/
    // Associate the route table with the public subnet
    /*    const subnetRouteTableAssociation = new ec2.CfnSubnetRouteTableAssociation(
      stack,
      "MySubnetRouteTableAssociation",
      {
        subnetId: vpc.publicSubnets[0].subnetId,
        routeTableId: routeTable.ref,
      }
    );
*/
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
