import { SynthUtils } from "@aws-cdk/assert"
import { ContainerImage, Ec2TaskDefinition } from "@aws-cdk/aws-ecs"
import { Stack } from "@aws-cdk/core"
import { FluentdLogDriver } from "./fluentd-log-driver-definition"

describe("FluentdLogDriverDefinition", () => {
  test("default", () => {
    const stack = new Stack()
    const taskDefinition = new Ec2TaskDefinition(stack, "TaskDefinition")

    const logDriver = new FluentdLogDriver()

    taskDefinition.addContainer("Container", {
      image: ContainerImage.fromRegistry("/aws/aws-example-app"),
      logging: logDriver,
      memoryLimitMiB: 2048,
    })

    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })

  test("can set fluentd-address", () => {
    const stack = new Stack()
    const taskDefinition = new Ec2TaskDefinition(stack, "TaskDefinition")

    const logDriver = new FluentdLogDriver({
      fluentdAddress: "127.0.0.1:24224",
    })

    taskDefinition.addContainer("Container", {
      image: ContainerImage.fromRegistry("/aws/aws-example-app"),
      logging: logDriver,
      memoryLimitMiB: 2048,
    })

    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })

  test("can set all options", () => {
    const stack = new Stack()
    const taskDefinition = new Ec2TaskDefinition(stack, "TaskDefinition")

    const logDriver = new FluentdLogDriver({
      env: "env",
      envRegex: "^(os|customer).",
      fluentdAddress: "127.0.0.1:24224",
      fluentdAsyncConnect: "true",
      fluentdBufferLimit: "8MB",
      fluentdMaxRetries: "20",
      fluentdRetryWait: "2",
      fluentdSubSecondPrecision: "true",
      labels: "labels",
      tag: "tag",
    })

    taskDefinition.addContainer("Container", {
      image: ContainerImage.fromRegistry("/aws/aws-example-app"),
      logging: logDriver,
      memoryLimitMiB: 2048,
    })

    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})
