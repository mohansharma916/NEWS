import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "Our standards for accuracy, independence, and corrections.",
};

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="prose prose-lg prose-blue max-w-none text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Editorial Policy
        </h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <p className="lead">
          At <strong>Know Your Views</strong>, our mission is to provide accurate, balanced, and insightful news. We adhere to strict editorial standards to ensure our readers can trust the information we present.
        </p>

        <h3>1. Accuracy and Fact-Checking</h3>
        <p>
          We are committed to accuracy. Our editors and writers verify all information before publication. We cross-reference claims with primary sources, official reports, and subject matter experts. If a story is developing, we will clearly state that the information is subject to change.
        </p>

        <h3>2. Corrections Policy</h3>
        <p>
          We believe in transparency. If we make a mistake, we correct it promptly.
        </p>
        <ul>
          <li><strong>Minor Errors:</strong> Typos or minor inaccuracies will be corrected immediately.</li>
          <li><strong>Substantive Errors:</strong> If a factual error changes the context of a story, we will add a "Correction" note at the bottom of the article explaining what was changed and when.</li>
        </ul>

        <h3>3. Independence and Integrity</h3>
        <p>
          Our editorial content is not influenced by advertisers, sponsors, or political interests. Sponsored content, if present, will always be clearly labeled as "Sponsored" or "Advertisement" to distinguish it from independent journalism.
        </p>

        <h3>4. Sourcing and Attribution</h3>
        <p>
          We believe in giving credit where it is due. We link back to original sources whenever possible. We avoid the use of anonymous sources unless necessary to protect the safety of the individual or the integrity of sensitive information.
        </p>

        <h3>5. Hate Speech and Harassment</h3>
        <p>
          We do not publish content that promotes hate speech, violence, discrimination, or harassment against individuals or groups based on race, religion, gender, sexual orientation, or disability.
        </p>

        <h3>6. Contacting the Editorial Team</h3>
        <p>
          If you have questions about our coverage or wish to report an error, please contact us at <a href="mailto:contact@knowyourviews.com">contact@knowyourviews.com</a>.
        </p>
      </div>
    </main>
  );
}