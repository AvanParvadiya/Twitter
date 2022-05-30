import React, { useEffect, useRef, useState } from "react";
import { Form } from "usetheform";
// import JSONTree from "react-json-tree";
import { WhatsHappeningBar } from "./components/WhatsHappeningBar/WhatsHappeningBar";
import { Preview } from "./components/Preview/Preview";
import { UploadMediaBar } from "./components/UploadMediaBar/UploadMediaBar";
import { PrivacyPicker } from "./components/PrivacyPicker/PrivacyPicker";
import { Submit } from "./components/Submit/Submit";
import { CharacterCounter } from "./components/CharacterCounter/CharacterCounter";
import "./Styles.css";

const MAX_CHARS_ALLOWED = 50;

export default function App() {
  const [feeds, setFeeds] = useState(1);
  const [allFeeds, setAllFeeds] = useState(Array.from(Array(1).keys()));

  const dragItem = useRef();
  const dragOverItem = useRef();

  const [addToIndex, setAddToIndex] = useState(-1);

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
    console.log(addToIndex);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...allFeeds];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setAllFeeds(copyListItems);
  };

  const addNewFeed = (index) => {
    setFeeds(feeds + 1);
    setAddToIndex(index);
  };
  
  useEffect(() => {
    // console.log(allFeeds);
    setAllFeeds(Array.from(Array(feeds).keys()));
  }, [feeds]);

  return (
    <div className="App">
      {allFeeds &&
        allFeeds.map((feed, index) => (
          <div key={index}>
            <Form
              onSubmit={onSubmit}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              draggable
            >
              <WhatsHappeningBar
                maxChars={MAX_CHARS_ALLOWED}
                addNewFeed={(index) => addNewFeed(index)}
              />
              <Preview />
              <PrivacyPicker />
              <span className="ThematicBreak" />
              <div className="ActionBar">
                <UploadMediaBar />
                <div className="ActionBar__Submit">
                  <CharacterCounter maxChars={MAX_CHARS_ALLOWED} />
                  <div
                    data-ui="bigRing"
                    className="ProgressRingBar circle"
                    onClick={() => addNewFeed(index)}
                  >
                    +
                  </div>
                  <span className="ThematicBreakVertical" />
                  <Submit />
                </div>
              </div>
              {/* form state viewer - debug only */}
              {/* <ReactJsonViewer /> */}
            </Form>
          </div>
        ))}
    </div>
  );
}

async function onSubmit(state) {
  // make an API call
  // await submitForm(state)
  const {
    editor: { plainText },
    ...resState
  } = state;
  console.log("onSubmit  => ", { ...resState, plainText });
  return true;
}

// function ReactJsonViewer() {
//   const { state } = useForm();
//   return (
//     <div className="ReactJsonViewer">
//       <JSONTree data={state} />
//     </div>
//   );
// }
