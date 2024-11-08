# k8s-platform

## AWS EKS Blueprints

EKS Blueprints can be used to bootstrap an EKS cluster alongside the resources needed like IAM roles, VPC and subnets, etc.

Reference: [Amazon EKS Blueprints Quick Start](https://aws-quickstart.github.io/cdk-eks-blueprints/getting-started/)

### Development

In the `images/devcdk` folder files to build a Docker image can be found, this image serves the porpuse of configuring node for the CDK use.

The image can be built with

```sh
cd  images && make CONTEXT=devcdk
```

Then this image can be used to run commands as needed. For example the `blueprints` folder was created by running:

```sh
# get image name
image=$(docker image ls devcdk --format '{{.Repository}}:{{.Tag}}')

# create directory
mkdir blueprints
cd blueprints

# run init command
docker run --rm \
    --mount type=bind,source="$(pwd)",target=/app \
    -u $(id -u ${USER}):$(id -g ${USER}) \
    ${image} \
    'cdk init app --language typescript && npm i @aws-quickstart/eks-blueprints'
```

### 
