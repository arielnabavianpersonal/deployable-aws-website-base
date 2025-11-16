import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DnsStack } from '../lib/dns-stack';
import { FrontendStack } from '../lib/frontend-stack';

const app = new cdk.App();

// DNS stack must be in us-east-1 for CloudFront certificate
const dnsStack = new DnsStack(app, 'DnsStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
  crossRegionReferences: true,
});

// Frontend stack can be in any region
new FrontendStack(app, 'FrontendStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  crossRegionReferences: true,
  certificate: dnsStack.certificate,
  domainName: dnsStack.domainName,
  hostedZone: dnsStack.hostedZone,
});