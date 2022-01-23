const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.0.0',
  defaultReleaseBranch: 'main',
  name: 'alphavantage_wrapper_pipeline',

  // cdkDependencies: undefined,  /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  deps: [ /* Runtime dependencies of this module. */
    '@masterofthebus/cdk-pipeline-lib@0.1.18'
  ],
  description: 'Creates a pipeline for a service that interacts with AlphaVantage API',
  devDeps: [ /* Build dependencies for this module. */
    '@masterofthebus/cdk-pipeline-lib@0.1.18'
  ],
  // packageName: undefined,      /* The "name" in package.json. */
  // release: undefined,          /* Add release management to this project. */
});
project.synth();