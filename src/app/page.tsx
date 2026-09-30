"use client";

/**
 * Single-route application shell. All "pages" are hash-routed views
 * (see src/lib/router.ts) so the app stays on `/`.
 */

import dynamic from "next/dynamic";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoute } from "@/lib/router";
import { HomeView } from "@/views/home";

const SubjectView = dynamic(() => import("@/views/subject").then((m) => m.SubjectView), {
  loading: () => <PageSkeleton />,
});
const TopicView = dynamic(() => import("@/views/topic").then((m) => m.TopicView), {
  loading: () => <PageSkeleton />,
});
const SessionView = dynamic(
  () => import("@/components/practice/session-view").then((m) => m.SessionView),
  { loading: () => <PageSkeleton /> },
);
const PracticeConfigView = dynamic(
  () => import("@/views/practice-config").then((m) => m.PracticeConfigView),
  { loading: () => <PageSkeleton /> },
);
const ProgressView = dynamic(() => import("@/views/progress").then((m) => m.ProgressView), {
  loading: () => <PageSkeleton />,
});
const AboutView = dynamic(() => import("@/views/about").then((m) => m.AboutView), {
  loading: () => <PageSkeleton />,
});

function PageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-96 max-w-full" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}

function CurrentView() {
  const route = useRoute();
  switch (route.name) {
    case "home":
      return <HomeView />;
    case "subject":
      return <SubjectView subject={route.subject} />;
    case "topic":
      return <TopicView subject={route.subject} topicId={route.topicId} />;
    case "practice":
      return <PracticeConfigView />;
    case "session":
      return <SessionView config={route.config} />;
    case "progress":
      return <ProgressView />;
    case "about":
      return <AboutView />;
    default:
      return <HomeView />;
  }
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CurrentView />
      </main>
      <Footer />
    </div>
  );
}
