import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Function, Runtime, S3Code } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export interface LambdaApiConstructProps {
    artifactBucket: string;
    artifactKey: string;
}

export class LambdaApiConstruct extends Construct {  
    constructor(scope: Construct, id: string, props: LambdaApiConstructProps) {
      super(scope, id);

      const { artifactBucket, artifactKey } = props;

      // The bucket that has the artifact
      const bucket = Bucket.fromBucketArn(this, 'ArtifactBucket', artifactBucket);

      // The function to serve the API
      const handler = new Function(scope, 'StockInfoFunction', {
        runtime: Runtime.PYTHON_3_8,
        handler: 'tickers_handler.handler',
        code: new S3Code(bucket, artifactKey)
      });

      // The API Gateway
      const api = new LambdaRestApi(this, 'StockInfoApi', {
        handler: handler,
        proxy: false
      });

      const tickerResource = api.root.addResource('tickers');
      tickerResource.addMethod('GET');
    }
}
