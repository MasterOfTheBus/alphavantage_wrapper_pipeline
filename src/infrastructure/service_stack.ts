import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib/core';

import { LambdaApiConstruct } from './api_construct';

export interface ServiceStackProps {
    artifactBucket: string;
    artifactKeys: string[];
}

export class ServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, serviceProps: ServiceStackProps, props?: cdk.StackProps) {
      super(scope, id, props);

      const { artifactBucket, artifactKeys } = serviceProps;

      // TODO: Create the bucket for the data store
      // TODO: Create the DDB table that stores the request rate
      // TODO: Create the Lambda that updates quarterly
      // TODO: Create the Cloudwatch event that updates quarterly

      new LambdaApiConstruct(scope, 'LambdaApiConstruct', {
          artifactBucket: artifactBucket,
          artifactKey: artifactKeys[0]
      });
    }
}
