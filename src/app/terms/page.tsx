import Link from "next/link";

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="prose prose-lg prose-blue max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-gray-500">Last updated: {currentDate}</p>

        <p>
          Welcome to <strong>Know Your Views</strong>! These terms and conditions outline the rules and regulations for the use of Know Your Views Website, located at{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            https://knowyourviews.com
          </Link>.
        </p>

        <p>
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use Know Your Views if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          1. Intellectual Property Rights
        </h2>
        <p>
          Other than the content you own, under these Terms, Know Your Views and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          2. Restrictions
        </h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Publishing any Website material in any other media without attribution;</li>
          <li>Selling, sublicensing, and/or otherwise commercializing any Website material;</li>
          <li>Using this Website in any way that is or may be damaging to this Website;</li>
          <li>Using this Website in any way that impacts user access to this Website;</li>
          <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
          <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this Website.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          3. Your Content
        </h2>
        <p>
          In these Website Standard Terms and Conditions, &quot;Your Content&quot; shall mean any audio, video text, images, or other material you choose to display on this Website (e.g., comments). By displaying Your Content, you grant Know Your Views a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          4. No Warranties
        </h2>
        <p>
          This Website is provided &quot;as is,&quot; with all faults, and Know Your Views expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          5. Limitation of Liability
        </h2>
        <p>
          In no event shall Know Your Views, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Know Your Views, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          6. External Links
        </h2>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by Know Your Views. Know Your Views has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You acknowledge and agree that Know Your Views shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with use of any such content, goods or services available on or through any such web sites or services.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          7. Changes to Terms
        </h2>
        <p>
          Know Your Views is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          8. Governing Law & Jurisdiction
        </h2>
        <p>
          These Terms will be governed by and interpreted in accordance with the laws of the State of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          9. Contact Us
        </h2>
        <p>
          If you have any questions about these Terms, please contact us:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>By email: contact@knowyourviews.com</li>
          <li>
            By visiting this page on our website:{" "}
            <Link
              href="/contact"
              className="text-blue-600 underline"
            >
              https://knowyourviews.com/contact
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}