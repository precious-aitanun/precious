import SectionHead from "@/components/ui/SectionHead";
import VideoTheater from "./VideoTheater";
import type { Video } from "@/lib/videos";

export default function Videos({ videos, appName }: { videos: Video[]; appName: string }) {
  if (videos.length === 0) return null;
  return (
    <section id="videos" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          title={`See ${appName} in action`}
          subtitle={
            videos.length === 1
              ? "A short walkthrough of the app, from start to finish."
              : "Short walkthroughs that show you around, one part of the app at a time."
          }
        />
        <div className="mt-12">
          <VideoTheater videos={videos} />
        </div>
      </div>
    </section>
  );
}
