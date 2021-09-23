/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { MessageArgs, File, CompileResponse } from "./compile";
import { resolve } from "path";
import { MessageChannel, Worker, receiveMessageOnPort } from "worker_threads";

type Message = Required<Pick<CompileResponse, keyof File>> & CompileResponse;
type Result = { message: Message } | undefined;
type Compile = (args: { filePath: string }) => File;

export default function compileFactory(): Compile {
  const worker = new Worker(resolve(__dirname, "./compile.js"));
  const signal = new Int32Array(new SharedArrayBuffer(4));
  const compile: Compile = ({ filePath }) => {
    signal[0] = 0;

    const { port1, port2 } = new MessageChannel();

    const message: MessageArgs = { signal, port: port1, filePath };

    worker.postMessage(message, [port1]);

    Atomics.wait(signal, 0, 0, 5000);

    const result: Result = receiveMessageOnPort(port2);

    if (!result) {
      throw new Error("Cannot serialize worker response");
    }

    if (result.message.error) {
      throw result.message.error;
    }

    if (result.message.warning) {
      console.warn(result.message.warning);
      delete result.message.warning;
    }

    return result.message;
  };

  worker.unref();

  return compile;
}
