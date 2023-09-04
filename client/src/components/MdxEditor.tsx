import React, { FC, useEffect, useState } from "react";
import "@mdxeditor/editor/style.css";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import {
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  CodeToggle,
  ListsToggle,
  listsPlugin,
  Separator,
  frontmatterPlugin,
  CreateLink,
  linkPlugin,
  BlockTypeSelect,
  imagePlugin,
  InsertImage,
  tablePlugin,
  InsertTable,
  thematicBreakPlugin,
  InsertThematicBreak,
  InsertAdmonition,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  linkDialogPlugin,
  quotePlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
interface IMDXProps {
  text: string;
  setText: (value: string) => void;
  textRef?: React.MutableRefObject<string | null>;
  btnClick?: React.MutableRefObject<boolean>;
}

const MdxEditor: FC<IMDXProps> = ({ text, setText, textRef, btnClick }) => {
  const [markdown, setMarkdown] = useState(text);
  useEffect(() => {
    setMarkdown(text);
  }, [text]);
  return (
    <MDXEditor
      onBlur={() => {
        if (btnClick) btnClick.current = false;
      }}
      className="min-vh-20"
      onChange={(value) => {
        setText(value);
        if (textRef) textRef.current = value;
      }}
      markdown={markdown}
      plugins={[
        diffSourcePlugin({
          viewMode: "rich-text",
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <BoldItalicUnderlineToggles />
              <Separator />
              <CodeToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
              <Separator />
              <InsertAdmonition />
            </DiffSourceToggleWrapper>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        frontmatterPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
      ]}
    />
  );
};
export default MdxEditor;
