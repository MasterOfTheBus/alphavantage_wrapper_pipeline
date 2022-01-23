import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib/core';

export class ServiceStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);

    }
}