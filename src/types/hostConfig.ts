export type HostOptions = Version2;
/**
 * The list of functions the host should load.
 */
export type Functions = string[];
/**
 * Value indicating the timeout duration for all functions.
 */
export type FunctionTimeout = string | null;
/**
 * Set of shared code directories that should be monitored for changes to ensure that when code in these directories is changed, it is picked up by your functions
 */
export type WatchDirectories = string[];

/**
 * Configuration settings for the function result aggregator.
 */
export interface Aggregator {
  /**
   * The maximum batch size for aggregations. If this value is reached before the 'flushTimeout', all values will be flushed.
   */
  batchSize?: number;
  /**
   * The aggregation duration. The aggregator will flush periodically based on this value.
   */
  flushTimeout?: string;
}
/**
 * Configuration settings for the Functions host health monitor
 */
export interface HealthMonitor {
  /**
   * Specifies whether the feature is enabled.
   */
  enabled?: boolean;
  /**
   * The time interval between the periodic background health checks
   */
  healthCheckInterval?: string;
  /**
   * A sliding time window used in conjunction with the healthCheckThreshold setting.
   */
  healthCheckWindow?: string;
  /**
   * Maximum number of times the health check can fail before a host recycle is initiated.
   */
  healthCheckThreshold?: number;
  /**
   * The threshold at which a performance counter will be considered unhealthy.
   */
  counterThreshold?: number;
}
/**
 * Configuration settings for Singleton lock behavior.
 */
export interface Singleton {
  /**
   * The period that function level locks are taken for (they will auto renew).
   */
  lockPeriod?: string;
  /**
   * The period that listener locks are taken for.
   */
  listenerLockPeriod?: string;
  /**
   * The time interval used for listener lock recovery if a listener lock couldn't be acquired on startup.
   */
  listenerLockRecoveryPollingInterval?: string;
  /**
   * The maximum amount of time the runtime will try to acquire a lock.
   */
  lockAcquisitionTimeout?: string;
  /**
   * The interval between lock acquisition attempts.
   */
  lockAcquisitionPollingInterval?: {
    [k: string]: any;
  };
}
/**
 * Configuration settings for 'http' triggers.
 */
export interface HttpExtension {
  /**
   * Defines the default route prefix that applies to all routes. Use an empty string to remove the prefix.
   */
  routePrefix: string;
  /**
   * Defines the the maximum number of http functions that will execute in parallel.
   */
  maxConcurrentRequests?: number;
  /**
   * Defines the maximum number of oustanding requests that will be held at any given time.
   */
  maxOutstandingRequests?: number;
  /**
   * Indicates whether dynamic host counter checks should be enabled.
   */
  dynamicThrottlesEnabled?: boolean;
}
/**
 * Configuration settings for 'queue' triggers.
 */
export interface QueuesExtension {
  /**
   * The maximum interval in milliseconds between queue polls.
   */
  maxPollingInterval?: number;
  /**
   * The number of queue messages to retrieve and process in parallel (per job function).
   */
  batchSize?: number;
  /**
   * The number of times to try processing a message before moving it to the poison queue
   */
  maxDequeueCount?: number;
  /**
   * The threshold at which a new batch of messages will be fetched. The default is batchSize/2.
   */
  newBatchThreshold?: number;
  /**
   * The visibility timeout that will be applied to messages that fail processing.
   */
  visibilityTimeout?: string;
}
/**
 * Configuration settings for 'orchestration'/'activity' triggers.
 */
export interface DurableTaskExtension {
  /**
   * Alternate task hub names can be used to isolate multiple Durable Functions applications from each other, even if they're using the same storage backend.
   */
  hubName?: string;
  storageProvider?: {
    connectionStringName?: string;
    /**
     * The number of messages to pull from the control queue at a time.
     */
    controlQueueBatchSize?: number;
    /**
     * The number of control queue messages that can be buffered in memory at a time, at which point the dispatcher will wait before dequeuing any additional messages.
     */
    controlQueueBufferThreshold?: number;
    /**
     * The visibility timeout of dequeued control queue messages.
     */
    controlQueueVisibilityTimeout?: string;
    /**
     * The maximum control and work-item queue polling interval in the hh:mm:ss format. Higher values can result in higher message processing latencies. Lower values can result in higher storage costs because of increased storage transactions.
     */
    maxQueuePollingInterval?: string;
    /**
     * The partition count for the control queue. May be a positive integer between 1 and 16.
     */
    partitionCount?: number;
    /**
     * The name of a connection string to use for the History and Instances tables. If not specified, the azureStorageConnectionStringName connection is used.
     */
    trackingStoreConnectionStringName?: string;
    /**
     * The prefix to use for the History and Instances tables when trackingStoreConnectionStringName is specified. If not set, the default prefix value will be DurableTask. If trackingStoreConnectionStringName is not specified, then the History and Instances tables will use the hubName value as their prefix, and any setting for trackingStoreNamePrefix will be ignored.
     */
    trackingStoreNamePrefix?: string;
    /**
     * The visibility timeout of dequeued work item queue messages.
     */
    workItemQueueVisibilityTimeout?: string;
  };
  tracing?: {
    /**
     * A value indicating whether to trace the inputs and outputs of function calls. The default behavior when tracing function execution events is to include the number of bytes in the serialized inputs and outputs for function calls. This behavior provides minimal information about what the inputs and outputs look like without bloating the logs or inadvertently exposing sensitive information. Setting this property to true causes the default function logging to log the entire contents of function inputs and outputs.
     */
    traceInputsAndOutputs?: boolean;
    /**
     * A value indicating whether to write orchestration replay events to Application Insights.
     */
    traceReplayEvents?: boolean;
  };
  notifications?: {
    eventGrid?: {
      /**
       * The URL of an Azure Event Grid custom topic endpoint. When this property is set, orchestration life-cycle notification events are published to this endpoint. This property supports App Settings resolution.
       */
      topicEndpoint?: string;
      /**
       * The name of the app setting containing the key used for authenticating with the Azure Event Grid custom topic at EventGridTopicEndpoint.
       */
      keySettingName?: string;
      /**
       * The number of times to retry if publishing to the Event Grid Topic fails.
       */
      publishRetryCount?: number;
      /**
       * The Event Grid publishes retry interval in the hh:mm:ss format.
       */
      publishRetryInterval?: string;
      /**
       * A list of event types to publish to Event Grid. If not specified, all event types will be published. Allowed values include Started, Completed, Failed, Terminated.
       */
      publishEventTypes?:
        | []
        | ["Started" | "Completed" | "Failed" | "Terminated"]
        | ["Started" | "Completed" | "Failed" | "Terminated", "Started" | "Completed" | "Failed" | "Terminated"]
        | [
            "Started" | "Completed" | "Failed" | "Terminated",
            "Started" | "Completed" | "Failed" | "Terminated",
            "Started" | "Completed" | "Failed" | "Terminated"
          ]
        | [
            "Started" | "Completed" | "Failed" | "Terminated",
            "Started" | "Completed" | "Failed" | "Terminated",
            "Started" | "Completed" | "Failed" | "Terminated",
            "Started" | "Completed" | "Failed" | "Terminated"
          ];
    };
  };
  /**
   * The maximum number of activity functions that can be processed concurrently on a single host instance.
   */
  maxConcurrentActivityFunctions?: number;
  /**
   * The maximum number of orchestrator functions that can be processed concurrently on a single host instance.
   */
  maxConcurrentOrchestratorFunctions?: number;
  extendedSessionsEnabled?: boolean;
  extendedSessionIdleTimeoutInSeconds?: number;
  /**
   * Enable gracefully shutting down to reduce the chance of host shutdowns failing in-process function executions.
   */
  useGracefulShutdown?: boolean;
}
/**
 * Configuration settings for Azure Cosmos DB bindings and triggers.
 */
export interface CosmosDBExtension {
  /**
   * ConnectionMode to be used on the DocumentClients.
   */
  connectionMode?: "Gateway" | "Direct";
  /**
   * Protocol to be used on the DocumentClients.
   */
  protocol?: "Https" | "Tcp";
}
export interface Version2 {
  /**
   * Configuration settings for extension bundle
   */
  extensionBundle?: {
    /**
     * The id of the extension bundle
     */
    id?: string;
    /**
     * The version of the extension bundle.
     */
    version?: string;
  };
  /**
   * Configuration settings for customizing the response to http requests
   */
  http?: {};
  aggregator?: Aggregator;
  functions?: Functions;
  functionTimeout?: FunctionTimeout;
  healthMonitor?: HealthMonitor;
  /**
   * Configuration settings for Language Workers.
   */
  languageWorker?: {
    /**
     * Specifies full path of the directory for language workers
     */
    workersDirectory?: string;
  };
  /**
   * Configuration settings for logging.
   */
  logging?: {
    /**
     * Log levels for specific categories.
     */
    logLevel?: {
      /**
       * The default level for logging. If a category level is not specified, this value is used.
       */
      default?: "Critical" | "Debug" | "Error" | "Information" | "None" | "Trace" | "Warning";
      [k: string]: "Critical" | "Debug" | "Error" | "Information" | "None" | "Trace" | "Warning" | undefined;
    };
    /**
     * Configuration settings for Application Insights logging.
     */
    applicationInsights?: {
      /**
       * Configuration settings for Application Insights client-side adaptive sampling.
       */
      samplingSettings?: {
        /**
         * If true, client-side adaptive sampling is enabled.
         */
        isEnabled?: boolean;
        /**
         * The target rate that the adaptive algorithm aims for on each instance
         */
        maxTelemetryItemsPerSecond?: number;
        [k: string]: any;
      };
    };
    /**
     * Value determining what level of file logging is enabled.
     */
    fileLoggingMode?: "never" | "always" | "debugOnly";
    [k: string]: any;
  };
  singleton?: Singleton;
  watchDirectories?: WatchDirectories;
  /**
   * The version of the function application.
   */
  version: "2.0";
  extensions?: {
    http?: HttpExtension;
    queues?: QueuesExtensionV2;
    /**
     * Configuration settings for 'serviceBus' triggers.
     */
    serviceBus?: {
      /**
       * The default PrefetchCount that will be used by the underlying MessageReceiver.
       */
      prefetchCount?: number;
      /**
       * The options that will be used for the message handler registered with the MessageReceiver.
       */
      messageHandlerOptions?: {
        /**
         * The maximum number of concurrent calls to the callback the message pump should initiate.
         */
        maxConcurrentCalls?: number;
        /**
         * The maximum duration within which the Service Bus message lock will be renewed automatically.
         */
        maxAutoRenewDuration?: string;
        /**
         * Value determining whether messages will be completed automatically, or whether the function will take responsibility message completion.
         */
        autoComplete?: boolean;
      };
    };
    /**
     * Configuration settings for 'eventHub' triggers.
     */
    eventHubs?: {
      /**
       * Configuration on processing event hub events.
       */
      eventProcessorOptions?: {
        /**
         * The maximum event count received per receive loop.
         */
        maxBatchSize?: number;
        /**
         * the timespan in which the user is willing to wait when the event processor is performing a receive operation.
         */
        receiveTimeout?: string;
        /**
         * Value indicating whether the runtime metric of a receiver is enabled.
         */
        enableReceiverRuntimeMetric?: boolean;
        /**
         * The default PrefetchCount that will be used by the underlying EventProcessorHost.
         */
        prefetchCount?: number;
        /**
         * Value indicating whether the processor should be invoked after every ReceiveTimeout when there are no more messages in the stream for a partition.
         */
        invokeProcessorAfterReceiveTimeout?: boolean;
      };
      /**
       * The number of batches to process before creating an EventHub cursor checkpoint
       */
      batchCheckpointFrequency?: number;
    };
    durableTask?: DurableTaskExtension;
    cosmosDB?: CosmosDBExtension;
    [k: string]: any;
  };
}
/**
 * Configuration settings for 'queue' triggers.
 */
export interface QueuesExtensionV2 {
  /**
   * The maximum interval between queue polls. Minimum is 00:00:00.100 (100 ms).
   */
  maxPollingInterval?: string;
  /**
   * The time interval between retries when processing of a message fails.
   */
  visibilityTimeout?: string;
  /**
   * The number of queue messages that the Functions runtime retrieves simultaneously and processes in parallel. When the number being processed gets down to the `newBatchThreshold`, the runtime gets another batch and starts processing those messages. So the maximum number of concurrent messages being processed per function is `batchSize` plus `newBatchThreshold`. This limit applies separately to each queue-triggered function.
   */
  batchSize?: number;
  /**
   * The number of times to try processing a message before moving it to the poison queue
   */
  maxDequeueCount?: number;
  /**
   * The threshold at which a new batch of messages will be fetched. The default is batchSize/2.
   */
  newBatchThreshold?: number;
}
