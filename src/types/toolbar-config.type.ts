export interface ToolbarConfig {
  undoRedo?:
    | boolean
    | {
        undo?: boolean;
        redo?: boolean;
      };

  blockFormat?: boolean;

  font?:
    | boolean
    | {
        fontFamily?: boolean;
        fontSize?: boolean;
      };

  textFormat?:
    | boolean
    | {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        code?: boolean;
        link?: boolean;
      };

  color?:
    | boolean
    | {
        textColor?: boolean;
        backgroundColor?: boolean;
      };

  textStyles?:
    | boolean
    | {
        lowercase?: boolean;
        uppercase?: boolean;
        capitalize?: boolean;
        strikethrough?: boolean;
        subscript?: boolean;
        superscript?: boolean;
        highlight?: boolean;
        clearFormatting?: boolean;
      };

  insert?:
    | boolean
    | {
        image?: boolean;
        table?: boolean;
      };

  alignment?: boolean;
}
