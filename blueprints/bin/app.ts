#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints'

const app = new cdk.App();

const account = process.env.AWS_ACCOUNT;
const region = process.env.AWS_REGION;
const version = cdk.aws_eks.KubernetesVersion.V1_31;
const encryption = false // set base on environment

// We should keep AddOns minimal and handle ourselves most of the workloads,
// this to make it easier to handle day 2 operations
const addOns: Array<blueprints.ClusterAddOn> = [
   new blueprints.addons.VpcCniAddOn(),
   new blueprints.addons.CoreDnsAddOn(),
   new blueprints.addons.KubeProxyAddOn(),
   new blueprints.addons.AwsLoadBalancerControllerAddOn()
];

const stack = blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .version(version)
    .addOns(...addOns)
    .useDefaultSecretEncryption(encryption)
    .build(app, 'eks-blueprint')
