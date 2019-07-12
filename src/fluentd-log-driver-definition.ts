import { CfnTaskDefinition, LogDriver, LogDriverConfig } from "@aws-cdk/aws-ecs"
import { Construct } from "@aws-cdk/core"

/**
 * Properties for defining a new Fluentd Log Driver
 */

export interface FluentdLogDriverProps {
  readonly env?: string
  readonly envRegex?: string
  readonly fluentdAddress?: string
  readonly fluentdAsyncConnect?: string
  readonly fluentdBufferLimit?: string
  readonly fluentdMaxRetries?: string
  readonly fluentdRetryWait?: string
  readonly fluentdSubSecondPrecision?: string
  readonly labels?: string
  readonly tag?: string
}

/**
 * A log driver that will log to the Fluentd collector
 */
export class FluentdLogDriver extends LogDriver {
  constructor(private readonly props?: FluentdLogDriverProps) {
    super()
  }

  /**
   * Called when the log driver is configured on a container
   */
  public bind(): LogDriverConfig {
    if (this.props === undefined) {
      return {
        logDriver: "fluentd",
      }
    }

    return {
      logDriver: "fluentd",
      options: removeEmpty({
        env: this.props.labels,
        "env-regex": this.props.envRegex,
        "fluentd-address": this.props.fluentdAddress,
        "fluentd-async-connect": this.props.fluentdAsyncConnect,
        "fluentd-buffer-limit": this.props.fluentdBufferLimit,
        "fluentd-max-retries": this.props.fluentdMaxRetries,
        "fluentd-retry-wait": this.props.fluentdRetryWait,
        "fluentd-sub-second-precision": this.props.fluentdSubSecondPrecision,
        labels: this.props.labels,
        tag: this.props.tag,
      }),
    }
  }
}

/**
 * Remove undefined values from a dictionary
 *
 * See: https://github.com/awslabs/aws-cdk/blob/v0.31.0/packages/@aws-cdk/aws-ecs/lib/log-drivers/aws-log-driver.ts#L89-L99
 */
function removeEmpty<T>(x: {
  [key: string]: T | undefined
}): { [key: string]: T } {
  for (const key of Object.keys(x)) {
    if (!x[key]) {
      delete x[key]
    }
  }
  return x as any
}
