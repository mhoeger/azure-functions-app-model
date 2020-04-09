// removed excluded and disabled

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface FunctionConfiguration {
  // /**
  //  * If set to true, the function will not be loaded, compiled, or triggered.
  //  */
  // excluded?: boolean;
  /**
   * Optional path to function script file.
   */
  scriptFile?: string;
  /**
   * Optional named entry point.
   */
  entryPoint?: string;
  /**
   * For C# precompiled functions only. If set to 'attributes', use WebJobs attributes to specify bindings. Otherwise, use the 'bindings' property of this function.json.
   */
  configurationSource?: "attributes" | "config";
  /**
   * A list of function bindings.
   */
  bindings?: BindingBase[];
  [k: string]: any;
}
export interface BindingBase {
  name: string;
  type: string;
  direction: "in" | "out" | "inout";
  /**
   * The data type hint for the binding parameter (string, binary, or stream).
   */
  dataType?: "string" | "binary" | "stream";
  [k: string]: any;
}