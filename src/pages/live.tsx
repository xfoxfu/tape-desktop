import { Center } from "@chakra-ui/react";
import { UnlistenFn } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { Question } from "../components/question";
import { listenLiveEvent } from "../tauri";

export const LivePage: React.FunctionComponent = ({ children }) => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [unlisten, setUnlisten] = useState<UnlistenFn | null>(null);
  useEffect(() => {
    listenLiveEvent((e) => {
      console.log(e);
      const p = JSON.parse(e.payload);
      setText(p.text ?? "");
      setTime(p.time ?? "");
    }).then(setUnlisten);
    return () => {
      unlisten?.();
    };
  }, []);
  return (
    <Center h="100vh" w="100vw" p={8}>
      {text && time && <Question text={text} time={time} size="xl" />}
    </Center>
  );
};

export default LivePage;
