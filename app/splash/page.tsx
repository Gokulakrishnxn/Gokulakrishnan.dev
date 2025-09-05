import { BrowserNavigation } from "@/components/browser-navigation";
import { VideoSplash } from "@/components/video-splash";

export default function SplashPreviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Splash Video Preview</h1>
        <p className="text-muted-foreground mb-6">
          Place your file at <code>/public/splash.mp4</code> or pass a custom src.
        </p>
        <div className="relative h-[60vh] rounded-lg overflow-hidden border">
          <VideoSplash allowSkip autoHide />
        </div>
      </main>
    </div>
  );
}


