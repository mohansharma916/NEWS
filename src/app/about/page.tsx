import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Know Your Views, our mission, and our commitment to balanced reporting.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Empowering You With The Facts
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          At <strong>Know Your Views</strong>, we believe that understanding the world shouldn&apos;t be complicated.
          We strip away the noise to bring you clarity, context, and perspective.
        </p>
      </div>

      <div className="prose prose-lg prose-blue max-w-none text-gray-700">
        
        {/* Mission */}
        <h3>Our Mission</h3>
        <p>
          In an era of information overload, finding reliable, unbiased news is a challenge. 
          Our mission is simple: to provide a platform where readers can access high-quality journalism 
          that covers Technology, Business, and Global Events with depth and accuracy.
        </p>
        <p>
          We don&apos;t just tell you <em>what</em> happened; we help you understand <em>why</em> it matters.
        </p>

        <hr className="my-10 border-gray-200" />

        {/* Values Grid */}
        <h3>Our Core Values</h3>
        <div className="grid gap-8 md:grid-cols-2 not-prose mt-6">
          <div className="rounded-2xl bg-blue-50 p-6">
            <h4 className="font-bold text-blue-900 text-xl mb-2">Accuracy First</h4>
            <p className="text-sm text-blue-800">
              We verify facts rigorously. Speed is important, but accuracy is non-negotiable.
            </p>
          </div>
          <div className="rounded-2xl bg-green-50 p-6">
            <h4 className="font-bold text-green-900 text-xl mb-2">Global Perspective</h4>
            <p className="text-sm text-green-800">
              We look beyond borders to bring you stories that shape the international landscape.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-50 p-6">
            <h4 className="font-bold text-purple-900 text-xl mb-2">Technological Insight</h4>
            <p className="text-sm text-purple-800">
              We decode the complexities of the tech world so you can stay ahead of the curve.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-50 p-6">
            <h4 className="font-bold text-orange-900 text-xl mb-2">Reader Centric</h4>
            <p className="text-sm text-orange-800">
              We design our experience for you—clean, fast, and respectful of your time and privacy.
            </p>
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        {/* Editorial Standards */}
        <h3>Editorial Standards</h3>
        <p>
          Our editorial team consists of passionate writers and technology enthusiasts dedicated to 
          journalistic integrity. We are committed to transparency and are open to corrections. 
          If you spot an error, we encourage you to reach out to us.
        </p>
      </div>
    </main>
  );
}