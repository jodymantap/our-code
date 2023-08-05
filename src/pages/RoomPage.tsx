import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { javascript, autoCloseTags } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import useRoom from "../composables/useRoom";
import usePageTitle from "../composables/usePageTitle";

const RoomPage: React.FC = () => {
  const { roomID } = useParams();
  const { roomData, enterRoom, updateCode, leaveRoom } = useRoom();
  usePageTitle(`Our Code - Room`);

  type DebouncedFn = (args: string) => void;

  const debouncedCodeChanges = useRef<(value: string) => void>();
  const prevRoomID = useRef<string | undefined>(roomID);
  const prevUpdateCode = useRef<typeof updateCode | undefined>(updateCode);
  const prevEnterRoom = useRef<typeof enterRoom | undefined>(enterRoom);
  const codeMirrorRef = useRef<any>();

  const [cursor, setCursor] = useState<number>(0);

  const handleOnChange = (value: string) => {
    const cursorPosition = handleCursorPosition();
    setCursor(cursorPosition);
    debouncedCodeChanges.current?.(value);
  };

  useEffect(() => {
    const debounce = (fn: DebouncedFn, delay: number) => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      return (value: string) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn(value);
          timer = null;
        }, delay);
      };
    };

    debouncedCodeChanges.current = debounce((value: string) => {
      prevUpdateCode
        .current?.(value, prevRoomID.current as string)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    }, 500);
  }, []);

  useEffect(() => {
    if (prevRoomID.current) {
      prevEnterRoom.current?.(prevRoomID.current);
    }

    return () => {
      leaveRoom();
    };
  }, []);

  useEffect(() => {
    if (roomData) {
      handleRestoreCursorPosition(cursor);
    }
  }, [roomData]);

  const handleCursorPosition = () => {
    if (codeMirrorRef.current) {
      const cursor = codeMirrorRef.current.view.state.selection.ranges[0].from;
      return cursor;
    }
  };

  const handleRestoreCursorPosition = (position: number) => {
    if (codeMirrorRef.current) {
      const view = codeMirrorRef.current.view;

      view.dispatch({ selection: { anchor: position } });
      view.focus();
    }
  };

  return (
    <>
      <CodeMirror
        ref={codeMirrorRef}
        value={roomData?.code || ""}
        height="70vh"
        width="80vw"
        extensions={[javascript({ jsx: true }), autoCloseTags]}
        theme={dracula}
        onChange={(value) => {
          handleOnChange(value);
        }}
      />
    </>
  );
};

export default RoomPage;
