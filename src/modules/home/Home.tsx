import { Skills } from "../skills";
import { FeatureChips } from "./components/FeatureChips";
import { Hero } from "./components/Hero";

export function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <FeatureChips />
      </div>

      <Skills />
    </main>
  );
}
