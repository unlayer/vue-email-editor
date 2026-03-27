import type {
  UnlayerEmbed,
  UnlayerEditor,
  UnlayerOptions,
  AppearanceConfig,
  DisplayMode,
  ToolsConfig,
} from '@unlayer/types';

export type Unlayer = UnlayerEmbed;
export type Editor = UnlayerEditor;

export interface EmailEditorProps {
  editor: Editor | null;
  editorId?: string | undefined;
  minHeight?: number | string | undefined;
  options?: UnlayerOptions;
  scriptUrl: string;

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
