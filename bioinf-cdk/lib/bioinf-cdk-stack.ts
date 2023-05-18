import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as path from 'path';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
//import { KeyPair } from 'cdk-ec2-key-pair';


/* Code is from the CDK examples

   https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/ec2-instance/src/config.sh

*/
export class BioinfCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

   // Create a Key Pair to be used with this EC2 Instance
    // Temporarily disabled since `cdk-ec2-key-pair` is not yet CDK v2 compatible
   // const key = new KeyPair(this, 'KeyPair', {
    //    name: 'cdk-keypair',
    //   description: 'Key Pair created with CDK Deployment',
    // });
    // key.grantReadOnPublicKey
    
     // Create new VPC with 2 Subnets
    const vpc = new ec2.Vpc(this, 'VPC', {
      natGateways: 0,
      subnetConfiguration: [{
        cidrMask: 24,
        name: "asterisk",
        subnetType: ec2.SubnetType.PUBLIC
      }]
    });
    
    
   // Allow SSH (TCP Port 22) access from anywhere
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Allow SSH (TCP port 22) in',
      allowAllOutbound: true
    });
    
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH Access')


    // Attach this role to the EC2 instance
    const role = new iam.Role(this, 'ec2Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    })

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'))
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'))
  


    // This is needed since I the AWS CLI is not installed by default on Ubuntu.  This will install it.
    // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-helper-scripts-reference.html
    const userData = ec2.UserData.forLinux()
        userData.addCommands(
          'apt-get update -y',
          'apt-get install awscli -y',
        );
    

 
   /* Help find the Ubuntu images
    https://cloud-images.ubuntu.com/locator/ec2/
   */


/*
    const ubuntuMachineImage = ec2.MachineImage.fromSsmParameter(
      '/ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-20230428ami-0044130ca185d0880",',
      {os: ec2.OperatingSystemType.LINUX},
    );
*/

    const ubuntuMachineImage = ec2.MachineImage.genericLinux(
      {
        'us-east-1': 'ami-0044130ca185d0880',
      },
      {
        userData: userData,
      });
     
    
      
    /*
    // volume for os
    const rootVolume: ec2.BlockDevice = {
      deviceName: '/dev/sda1', // Use the root device name from Step 1
      volume: ec2.BlockDeviceVolume.ebs(2048,
        {
          deleteOnTermination: true,
        })
  
    };
    
    // volume for data
    const dataVolume: ec2.BlockDevice = {
      deviceName: '/dev/sdf', // Use the root device name from Step 1
      volume: ec2.BlockDeviceVolume.ebs(8192,
        {
          deleteOnTermination: true,
        })
  
    };
    
       
    const workingVolume = new ec2.Volume(this, 'Volume', {
      availabilityZone: 'us-east-1a',
      size: cdk.Size.gibibytes(8192),
      encrypted: true,
      volumeName: '/dev/sdf',
      volumeType: ec2.EbsDeviceVolumeType.GP2,
    
    });
   
    */
    
     // Create the instance using the Security Group, AMI, and KeyPair defined in the VPC created
    const ec2Instance = new ec2.Instance(this, 'Bioinformatics-Ubuntu-R5A-Large', {
      instanceName: 'Bioinformatics-Ubuntu-R5A-Large',
      vpc,

      instanceType: ec2.InstanceType.of(ec2.InstanceClass.R5A, ec2.InstanceSize.XLARGE24),
      machineImage: ubuntuMachineImage,
      
      securityGroup: securityGroup,
      // keyName: key.keyPairName,
      role: role,
      
      blockDevices: [
        {
          deviceName: '/dev/sda1', // Use the root device name from Step 1
          volume: ec2.BlockDeviceVolume.ebs(2048,
          {
            deleteOnTermination: true,
          })
        },
        {
          deviceName: '/dev/sdf', // Use the root device name from Step 1
          volume: ec2.BlockDeviceVolume.ebs(8192,
          {
            deleteOnTermination: true,
          })
        },
      
      ]
    });
    
 
  
       // Create an asset that will be used as part of User Data to run on first load
    const asset = new Asset(this, 'Asset', { path: path.join(__dirname, '../src/config.sh') });
    
    const localPath = ec2Instance.userData.addS3DownloadCommand({
      bucket: asset.bucket,
      bucketKey: asset.s3ObjectKey,
    });

    ec2Instance.userData.addExecuteFileCommand({
      filePath: localPath,
      arguments: '--verbose -y'
    });
    
    asset.grantRead(ec2Instance.role);
    
    

    // Create outputs for connecting
    new cdk.CfnOutput(this, 'Script path', { value: localPath });
    new cdk.CfnOutput(this, 'IP Address', { value: ec2Instance.instancePublicIp });
    new cdk.CfnOutput(this, 'Download Key Command', { value: 'aws secretsmanager get-secret-value --secret-id ec2-ssh-key/cdk-keypair/private --query SecretString --output text > cdk-key.pem && chmod 400 cdk-key.pem' })
    new cdk.CfnOutput(this, 'ssh command', { value: 'ssh -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@' + ec2Instance.instancePublicIp })

  }
}
