/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from 'path';
import {Utility} from './utility';
import {LabelResolver} from './labelresolver';
import {OrchestratorHelper} from './orchestratorhelper';

export class OrchestratorAdd {
  // eslint-disable-next-line max-params
  public static async runAsync(
    nlrPath: string,
    inputPath: string,
    outputPath: string,
    snapshotPath: string,
    labelPrefix: string = '') {
    if (!nlrPath || nlrPath.length === 0) {
      throw new Error('Please provide path to Orchestrator model');
    }

    if (!inputPath || inputPath.length === 0) {
      throw new Error('Please provide input path');
    }

    if (!outputPath || outputPath.length === 0) {
      throw new Error('Please provide output path');
    }

    if (!snapshotPath || snapshotPath.length === 0) {
      throw new Error('Please provide snapshot path');
    }

    const labelResolver: any = await LabelResolver.createWithSnapshotAsync(nlrPath, OrchestratorHelper.readFile(snapshotPath));

    const ext: string = OrchestratorHelper.isDirectory(inputPath) ? '' : path.extname(inputPath);
    if (ext === '.blu') {
      labelResolver.addSnapshot(OrchestratorHelper.readFile(inputPath), labelPrefix);
    } else {
      LabelResolver.addExamples(await OrchestratorHelper.getUtteranceLabelsMap(inputPath));
    }

    //const snapshot: any = labelResolver.createSnapshot();
    //Utility.debuggingLog(snapshot);
    //OrchestratorHelper.writeToFile(outputPath, snapshot);
  }
}