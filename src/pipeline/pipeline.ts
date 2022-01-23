import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipelineConstruct, CodeStarConnectionDef } from '@masterofthebus/cdk-pipeline-lib';
import { ServiceStage } from '../infrastructure/service_stage';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const env = props?.env;
    if (!env) {
        throw new Error('Missing env definition');
    }

    const pipelineSource = new CodeStarConnectionDef({
      // A CodeStar Connection ARN
      codeStarConnection: "arn:aws:codestar-connections:us-east-1:025257542471:connection/b53232ef-36cd-40e2-90ce-4bed059aed57",
      repo: "alphavantage_wrapper_pipeline",
      repoOwner: "MasterOfTheBus",
      branch: "main"
    });

    const codeSource = new CodeStarConnectionDef({
      // A CodeStar Connection ARN
      codeStarConnection: "arn:aws:codestar-connections:us-east-1:025257542471:connection/b53232ef-36cd-40e2-90ce-4bed059aed57",
      repo: "alphavantage_wrapper",
      repoOwner: "MasterOfTheBus",
      branch: "main"
    });

    const bucketArn = 'arn:aws:s3:::sng-lambda-deployments-bucket';
    const artifactKey = 'artifacts.zip';

    const pipeline = new CodePipelineConstruct(this, 'CodePipeline', {
      pipelineSource: pipelineSource,
      source: codeSource,
      artifactBucketArn: bucketArn,
      artifactKey: artifactKey,
      githubUser: 'masterofthebus',
      githubEmail: 'yendisng@gmail.com'
    });

    pipeline.pipeline.addStage(
      new ServiceStage(this ,'AlphaVService', { env: env })
    );
  }
}