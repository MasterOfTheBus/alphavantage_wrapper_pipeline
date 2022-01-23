import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib/core';
import { ServiceStack } from './service_stack';

export interface ServiceStageProps {
  artifactBucket: string;
  artifactKeys: string[];
}

export class ServiceStage extends cdk.Stage {

    constructor(scope: Construct, id: string, serviceProps: ServiceStageProps, props?: cdk.StageProps) {
      super(scope, id, props);

      new ServiceStack(scope, 'StockInfoApiStack', serviceProps)
    }
}
