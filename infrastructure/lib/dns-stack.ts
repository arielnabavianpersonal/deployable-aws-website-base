import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

const DOMAIN_NAME = 'www.ariels-custom-website-react.com';
const HOSTED_ZONE_NAME = 'ariels-custom-website-react.com';

export class DnsStack extends cdk.Stack {
  public readonly certificate: acm.ICertificate;
  public readonly hostedZone: route53.IHostedZone;
  public readonly domainName: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.domainName = DOMAIN_NAME;

    this.hostedZone = route53.HostedZone.fromLookup(
      this,
      'HostedZone',
      {
        domainName: HOSTED_ZONE_NAME,
      }
    );

    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: DOMAIN_NAME,
      validation: acm.CertificateValidation.fromDns(this.hostedZone),
    });
  }
}
