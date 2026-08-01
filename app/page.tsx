import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import Features from "@/components/Features";
import Screenshots from "@/components/Screenshots";
import HowItWorks from "@/components/HowItWorks";
import Subjects from "@/components/Subjects";
import Download from "@/components/Download";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { getApkInfo } from "@/lib/apk";

export default function Home() {
  const apkInfo = getApkInfo();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatStrip />
        <Features />
        <Screenshots />
        <HowItWorks />
        <Subjects />
        <Download apkInfo={apkInfo} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
