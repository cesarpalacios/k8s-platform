# k8s-platform

## Credentials

### AWS Credentials
Using the credentials file is also an option for this update the `~/.aws/credentials` file accordingly.

The use of profiles is recommended when multiple managing multiple accounts (e.g. `--profile local`) or by setting environment variable **AWS_PROFILE**.

```sh
[default]
aws_access_key_id = ....
aws_secret_access_key = ....

[dev]
aws_access_key_id = ....
aws_secret_access_key = ....

[prod]
aws_access_key_id = ....
aws_secret_access_key = ....
```

### Direnv
Exposing credentials from environment variables follow the twelve-factor app pattern and allows us to avoid placing them in version control systems.

For that reason we can use [direnv](https://direnv.net/) to avoid defining and loading variables multiple times

```sh
# Setup example with debian and zsh
sudo apt install direnv
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc

# Export variables
echo export AWS_ACCOUNT=.......... >> .envrc
echo export AWS_REGION=........... >> .envrc
echo export AWS_PROFILE=.......... >> .envrc
echo export UID=$(id -u) >> .envrc
echo export GID=$(id -g) >> .envrc

# Allow them
direnv allow .
```

## AWS EKS Blueprints

EKS Blueprints can be used to bootstrap an EKS cluster alongside the resources needed like IAM roles, VPC and subnets, etc.

Reference: [Amazon EKS Blueprints Quick Start](https://aws-quickstart.github.io/cdk-eks-blueprints/getting-started/)
CDK docs: [AWS CDK API Reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html)

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

A docker compose file is also provided under `blueprints/compose.yaml`

#### Examples

Generic command

```sh
# in root k8s-platform path
docker compose --project-directory blueprints run cdk <cmd>
```

[Boostrapping](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html) the environment can be done with Docker Compose:

```sh
# in root k8s-platform path
docker compose --project-directory blueprints run cdk 'cdk bootstrap aws://${AWS_ACCOUNT}/${AWS_REGION}'
```

Deploying Kubernetes cluster

```sh
docker compose --project-directory blueprints run cdk 'cdk deploy eks-blueprint'
```

