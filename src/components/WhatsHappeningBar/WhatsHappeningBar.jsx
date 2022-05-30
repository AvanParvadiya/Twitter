import React from "react";
import { Collection, Input } from "usetheform";
import { DraftEditor } from "./DraftEditor";
import { extractPlainText } from "./utils/extractPlainText";
import { limitTo } from "./utils/limitTo";

import "./Styles.css";

export const WhatsHappeningBar = ({ maxChars,addNewFeed }) => {
  return (
    <div className="WhatsHappeningBar" style={{"border":'2px solid #fff'}}>
      <Collection
        object
        name="editor"
        validators={[limitTo(maxChars)]}
        reducers={extractPlainText}
      >
        <DraftEditor name="editorState" maxChars={maxChars} addNewFeed={addNewFeed} />
        <Input type="hidden" name="plainText" />
      </Collection>
    </div>
  );
};
