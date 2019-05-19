
# cdk-fluentd-log-driver

[![Build Status](https://travis-ci.org/cohalz/cdk-fluentd-log-driver.png?branch=master)][travis]

:warning: This library is still experimental because underlying [AWS CDK][aws-cdk] is in developer preview release.

## Synopsis

```typescript
import { FluentdLogDriver } from "@cohalz/cdk-fluentd-log-driver";
import { Ec2TaskDefinition } from "@aws-cdk/aws-ecs";
import { Stack } from "@aws-cdk/cdk";

const stack = new Stack()
const taskDefinition = new Ec2TaskDefinition(stack, "TaskDefinition")
const fluentdLogDriver = new FluentdLogDriver(stack, "fluentd-log-driver", {
  fluentdAddress: "127.0.0.1:24224",
})

taskDefinition.addContainer("Container", {
  image: ContainerImage.fromRegistry("/aws/aws-example-app"),
  logging: fluentdLogDriver,
  memoryLimitMiB: 2048,
})
```

[aws-cdk]: https://github.com/awslabs/aws-cdk
