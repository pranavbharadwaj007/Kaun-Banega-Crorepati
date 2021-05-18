import useSound from "use-sound";
import { useRef, useEffect } from "react";
import Image from "next/image";
function Start({ setUsername }) {
  const play = "/startPlay.mp3";
  const [letsPlay] = useSound(play);
  useEffect(() => {
    console.log("start");
    letsPlay();
  }, [letsPlay]);
  const inputRef = useRef();
  return (
    <div className="start">
      <Image src="/kbc.jpg" alt="kbc" width={200} height={200} />
      <input
        placeholder="Enter ur name"
        className="startInput"
        ref={inputRef}
      />
      <button
        className="startButton"
        onClick={() => setUsername(inputRef.current.value)}
      >
        Start
      </button>
    </div>
  );
}

export default Start;
