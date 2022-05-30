import React, { useCallback, useMemo, useRef } from "react";
import { composeDecorators } from "./utils/composeDecorators";
import { useField } from "usetheform";
import { Editor, EditorState, convertToRaw } from "draft-js";

export const DraftEditor = ({ maxChars, name = "editorState" ,addNewFeed}) => {
  const initialState = useMemo(
    () => EditorState.createEmpty(composeDecorators(maxChars)),
    [maxChars]
  );

  const { value, setValue } = useField({
    type: "custom",
    name,
    value: initialState,
  });

  const onInputChange = useCallback(
    (editorState) => {
      setValue(editorState);

      const data = convertToRaw(editorState.getCurrentContent());
      const lastElement = data.blocks.slice(-2);
      
      if (lastElement.length === 2) {
      
        if (lastElement[0].text === "" && lastElement[1].text === "") {
          console.log("Matched");
          addNewFeed();
        }
      }
    },

    [setValue]
  );

  /* 
     field used to hold the draft's ref 
     within the form state in order to be easly
     accessible from external form's fields (Input, Collection etc..) 
  */
  const refEditor = useRef(null);
  useField({
    type: "custom",
    name: "refEditor",
    value: refEditor,
  });

  return (
    <div className="Editor">
      <Editor
        ref={refEditor}
        editorState={value}
        onChange={onInputChange}
        placeholder="What’s happening?"
      />
    </div>
  );
};
