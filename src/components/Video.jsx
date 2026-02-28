import YouTube from "react-youtube";

function Video({
  videoId,
  startSeconds = 0,
  onPlay,
  onPause,
  onEnd,
  className = "",
}) {
  return (
    <div
      className={`w-full aspect-video rounded-lg overflow-hidden border-2 border-[#0a1945] shadow-lg relative bg-black ${className}`}
    >
      <YouTube
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            start: startSeconds,
            rel: 0,
          },
        }}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
}

export default Video;
