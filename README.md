
# cdk-fluentd-log-driver

![Build Status](https://travis-ci.org/cohalz/cdk-fluentd-log-driver.png?branch=master)

cdk-fluentd-log-driver provides helper function that uses fluentd log driver to your ECS task definition.

## Synopsis

```typescript
import { FluentdLogDriver } from "@cohalz/cdk-fluentd-log-driver";
import { Ec2TaskDefinition } from "@aws-cdk/aws-ecs";
import { Stack } from "@aws-cdk/cdk";

const stack = new Stack()
const taskDefinition = new Ec2TaskDefinition(stack, "TaskDefinition")

const logDriver = new FluentdLogDriver({
  fluentdAddress: "127.0.0.1:24224",
  fluentdMaxRetries: "3",
  fluentdRetryWait: "2",
  tag: "tag",
})

taskDefinition.addContainer("Container", {
  image: ContainerImage.fromRegistry("/aws/aws-example-app"),
  memoryLimitMiB: 2048,
  // Use a fluentd log driver
  logging: logDriver,
})
```

For available options, please refer to the [docker docs](https://docs.docker.com/config/containers/logging/fluentd/#options).
