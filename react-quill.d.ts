declare module "react-quill" {
  import * as React from "react";

  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (content: string, delta: any, source: string, editor: any) => void;
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    style?: React.CSSProperties;
    className?: string;
  }

  const ReactQuill: React.FC<ReactQuillProps>;
  export default ReactQuill;
}