import { useEffect, useRef } from "react";
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
    }, 800);
  }, []);

  useEffect(() => {
    if (prevRoomID.current) {
      prevEnterRoom.current?.(prevRoomID.current);
    }

    return () => {
      leaveRoom();
    };
  }, []);

  return (
    <>
      <CodeMirror
        value={roomData?.code || ""}
        height="70vh"
        width="80vw"
        extensions={[javascript({ jsx: true }), autoCloseTags]}
        theme={dracula}
        onChange={(value) => {
          debouncedCodeChanges.current?.(value);
        }}
      />
    </>
  );
};

export default RoomPage;
