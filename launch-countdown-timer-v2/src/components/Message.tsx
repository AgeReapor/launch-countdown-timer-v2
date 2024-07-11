import { useEffect, useState } from "react";
import "./Message.scss";

type Props = {
  message: string;
};

export default function Message({ message }: Props) {
  const [messageString, setMessageString] = useState<string>("");

  // update text on message change
  useEffect(() => {
    setMessageString(message.toUpperCase());
  }, [message]);

  return (
    <header>
      <h3>{messageString}</h3>
    </header>
  );
}
