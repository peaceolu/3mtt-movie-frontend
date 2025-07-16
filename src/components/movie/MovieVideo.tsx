import YouTubePlayer from "react-youtube";
export default function MovieVideo({ videoId }: { videoId: string }) {
	return (
		<YouTubePlayer
			videoId={videoId}
			className="w-full h-[300px] md:h-full rounded-md"
			opts={{
				playerVars: {
					controls: 1, // Show controls
					rel: 0, // Do not show related videos at the end
				},
			}}
		/>
	);
}
