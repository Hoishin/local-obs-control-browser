import { useEffect, useId, useState } from "react";
import { obs } from "./obs.js";

export const Connect = () => {
  const portInputId = useId();
  const passwordInputId = useId();

  const [port, setPort] = useState("4455");
  const [password, setPassword] = useState("");

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const openedListener = () => {
      setConnected(true);
    };
    const closedListener = () => {
      setConnected(false);
    };
    obs.addListener("ConnectionOpened", openedListener);
    obs.addListener("ConnectionClosed", closedListener);
    return () => {
      obs.removeListener("ConnectionOpened", openedListener);
      obs.removeListener("ConnectionClosed", closedListener);
    };
  }, []);

  return (
    <div>
      {connected ? (
        <button
          onClick={() => {
            obs.disconnect();
          }}
        >
          Disconnect
        </button>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            obs.connect(
              `ws://localhost:${parseInt(port)}`,
              password ? password : undefined
            );
          }}
        >
          <label htmlFor={portInputId}>Port</label>
          <input
            id={portInputId}
            type="number"
            value={port}
            onChange={(event) => {
              setPort(event.target.value);
            }}
          />

          <label htmlFor={passwordInputId}>Password</label>
          <input
            id={passwordInputId}
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button type="submit">Connect</button>
        </form>
      )}
    </div>
  );
};
