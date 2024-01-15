import { useCallback, useEffect, useRef, useState } from "react";

const drumFiles = [
    {
        key: "Q",
        filename: "heater-1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
        key: "W",
        filename: "heater-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
        key: "E",
        filename: "heater-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
        key: "A",
        filename: "heater-4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
        key: "S",
        filename: "clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
        key: "D",
        filename: "open-hh",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
        key: "Z",
        filename: "kick-n-hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
        key: "X",
        filename: "kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
        key: "C",
        filename: "closed-hh",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
];

function App() {
    const [songList, setSongList] = useState(drumFiles);
    const [playing, setPlaying] = useState("none");
    const ulRef = useRef(null);
    const playOnKeyPress = useCallback(
        (e) => {
            const audioFiles = ulRef.current.querySelectorAll("audio");
            audioFiles.forEach((audio) => {
                if (audio.id.toLowerCase() === e.key) {
                    const playing = songList.find(
                        (song) => song.key === audio.id
                    );
                    audio.play();
                    showPlayed(playing.filename);
                }
            });
        },
        [songList]
    );

    function showPlayed(song) {
        setPlaying(song);
        setTimeout(() => {
            setPlaying("none");
        }, 1200);
    }

    useEffect(() => {
        window.addEventListener("keydown", playOnKeyPress);
        return () => window.removeEventListener("keydown", playOnKeyPress);
    }, [playOnKeyPress]);

    return (
        <>
            <header>
                <h1>Drum Machine</h1>
            </header>
            <section id={"drum-machine"} className="drum-machine">
                <div className="container">
                    <div className="grid">
                        <p className="instruction">
                            Press or click one of the buttons on the left to
                            hear a sound. The played sound is shown below:
                        </p>
                        <span id="display" className="display">
                            {playing === "none" ? "" : playing}
                        </span>
                        <ul className="drumPads" ref={ulRef}>
                            {songList.map((song) => {
                                return (
                                    <DrumPad
                                        key={song.filename}
                                        playing={playing}
                                        song={song}
                                        displayPlayed={(song) => {
                                            showPlayed(song);
                                        }}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

function DrumPad({ song, displayPlayed, playing }) {
    const audioFileRef = useRef(null);

    function playSong() {
        audioFileRef.current.play();
        displayPlayed(song.filename);
    }

    return (
        <li>
            <button
                onClick={playSong}
                className={`drum-pad ${
                    song.filename === playing ? "played" : ""
                }`}
                id={song.filename}
            >
                {song.key}
                <audio
                    id={song.key}
                    ref={audioFileRef}
                    src={song.url}
                    className="clip"
                ></audio>
            </button>
        </li>
    );
}

export default App;
