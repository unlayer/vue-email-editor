// ignore next line
/// <reference types="unlayer-types/embed.d.ts" />

import Embed from 'embed/index';
import { Editor as EditorClass } from 'embed/Editor';
import { Config } from "embed/Config";
import { AppearanceConfig, DisplayMode, ToolsConfig } from 'state/types/types';

export type Unlayer = typeof Embed;
export type Editor = InstanceType<typeof EditorClass>;

export interface EmailEditorProps {
  editor: Editor | null;
  editorId?: string | undefined;
  minHeight?: number | string | undefined;
  options?: Config;

  // redundant props -- already available in options
  /** @deprecated */
  appearance?: AppearanceConfig | undefined;
  /** @deprecated */
  displayMode?: DisplayMode;
  /** @deprecated */
  locale?: string | undefined;
  /** @deprecated */
  projectId?: number | undefined;
  /** @deprecated */
  tools?: ToolsConfig | undefined;

  /** @deprecated */
  exportHtml: Editor['exportHtml'];
  /** @deprecated */
  loadDesign: Editor['loadDesign'];
  /** @deprecated */
  saveDesign: Editor['saveDesign'];
}

declare global {
  const unlayer: Unlayer;

  interface Window {
    __unlayer_lastEditorId: number;
  }
}