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

  type DebouncedFn = (value: string, length: number, cursor: number) => void;

  const debouncedCodeChanges =
    useRef<
      (value: string, changesLength: number, latestCursorPos: number) => void
    >();
  const prevRoomID = useRef<string | undefined>(roomID);
  const prevUpdateCode = useRef<typeof updateCode | undefined>(updateCode);
  const prevEnterRoom = useRef<typeof enterRoom | undefined>(enterRoom);
  const codeMirrorRef = useRef<any>();

  const [cursor, setCursor] = useState<number>(0);

  const handleOnChange = (value: string) => {
    if (roomData?.code) {
      const cursorPosition = handleCursorPosition();
      const length = value.length - roomData.code.length;
      debouncedCodeChanges.current?.(value, length, cursorPosition);
      setCursor(cursorPosition);
    }
  };

  useEffect(() => {
    const debounce = (fn: DebouncedFn, delay: number) => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      return (
        value: string,
        changesLength: number,
        latestCursorPos: number
      ) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn(value, changesLength, latestCursorPos);
          timer = null;
        }, delay);
      };
    };

    debouncedCodeChanges.current = debounce(
      (value: string, changesLength: number, latestCursorPos: number) => {
        prevUpdateCode
          .current?.(
            value,
            prevRoomID.current as string,
            changesLength,
            latestCursorPos
          )
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      },
      500
    );
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
    if (codeMirrorRef.current && roomData?.code !== "") {
      const cursor =
        codeMirrorRef.current.view?.state?.selection?.ranges[0].from;
      return cursor;
    }
  };

  const handleRestoreCursorPosition = (position: number) => {
    if (codeMirrorRef.current && roomData?.code !== "") {
      const view = codeMirrorRef.current.view;

      if (
        roomData?.latest_cursor_position &&
        roomData.latest_changes_length &&
        roomData.latest_cursor_position < cursor
      ) {
        view.dispatch({
          selection: { anchor: position + roomData.latest_changes_length },
        });
      } else {
        view.dispatch({
          selection: { anchor: position },
        });
      }
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
