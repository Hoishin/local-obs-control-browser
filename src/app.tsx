import { useEffect, useState } from "react";
import { Connect } from "./connect.js";
import { obs } from "./obs.js";

export const App = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const listener = (payload: { inputName: string; inputMuted: boolean }) => {
      if (payload.inputName === "Mic/Aux") {
        setMuted(payload.inputMuted);
      }
    };
    obs.addListener("InputMuteStateChanged", listener);
    return () => {
      obs.removeListener("InputMuteStateChanged", listener);
    };
  }, []);

  return (
    <div>
      <div>
        This is NodeCG host dashboard. Just have to imagine all the buttons and
        stuff.
      </div>
      <Connect />
      <div>Currently: {muted ? "Muted" : "Open"}</div>
      <button
        onClick={() => {
          obs.call("ToggleInputMute", { inputName: "Mic/Aux" });
        }}
      >
        Toggle Your OBS Mic
      </button>
    </div>
  );
};
