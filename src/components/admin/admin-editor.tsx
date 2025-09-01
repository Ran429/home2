"use client";

import ClientFileUtil from "@/lib/client-file-util";
import { Editor } from "@tinymce/tinymce-react";
import { MutableRefObject, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

type Props = {
  initialValue?: string;
  editorRef?: MutableRefObject<TinyMCEEditor | undefined>;
};

export default function AdminEditor({ initialValue, editorRef }: Props) {
  const [editor, setEditor] = useState<TinyMCEEditor | undefined>();

  return (
    <Editor
      id="tinymce_editor"
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(_evt, editor) => {
        setEditor(editor);
        if (editorRef) {
          editorRef.current = editor;
        }
      }}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker importcss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | emoticons charmap | removeformat",
        extended_valid_elements:
          "image[class|style],table[class|style],span[class|style],p[class|style],div[class|style],br",
        content_css: ClientFileUtil.getStaticFileUrl("css/global_240930.css"),
        height: "600px",
        importcss_append: true,
        content_style: "body { padding: 20px} ",
      }}
      initialValue={initialValue ?? ""}
    />
  );
}
