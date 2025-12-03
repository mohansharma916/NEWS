import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="prose prose-lg prose-blue max-w-none text-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <p>
          This Cookie Policy explains how Know Your Views (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies to recognize you when you visit our website at{" "}
          <Link href="/" className="text-blue-600">https://knowyourviews.com</Link>. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <h3>1. What are cookies?</h3>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>

        <h3>2. Why do we use cookies?</h3>
        <p>We use cookies for several reasons:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our Website (e.g., authentication for Admins).</li>
          <li><strong>Performance & Analytics Cookies:</strong> These collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</li>
          <li><strong>Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</li>
        </ul>

        <h3>3. Google AdSense & DoubleClick</h3>
        <p>
          We use Google AdSense to serve ads. Google uses the DoubleClick cookie to serve ads based on a user&apos;s prior visits to our website or other websites on the Internet.
          Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
        </p>

        <h3>4. How can I control cookies?</h3>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. You can also set or amend your web browser controls to accept or refuse cookies.
        </p>

        <h3>5. Updates to this Policy</h3>
        <p>
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons.
        </p>
      </div>
    </main>
  );
}