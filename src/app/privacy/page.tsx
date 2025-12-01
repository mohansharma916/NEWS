export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="prose prose-lg prose-blue max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-gray-500">Last updated: {currentDate}</p>

        <p>
          At <strong>The View Island</strong>, accessible from{" "}
          <span className="text-blue-600">"DOMAIN WEBSITE"</span>, one
          of our main priorities is the privacy of our visitors. This Privacy
          Policy document contains types of information that is collected and
          recorded by The View Island and how we use it.
        </p>

        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          1. Information We Collect
        </h2>
        <p>
          We collect information to provide better services to all our users. The
          information we collect includes:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <strong>Personal Information:</strong> When you subscribe to our
            newsletter or create an account, we may ask for personal information
            such as your name and email address.
          </li>
          <li>
            <strong>Log Data:</strong> Like many other websites, The View Island
            makes use of log files. These files log visitors when they visit the
            site. The information collected includes Internet Protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), date and
            time stamp, referring/exit pages, and possibly the number of clicks.
          </li>
          <li>
            <strong>Cookies and Web Beacons:</strong> We use cookies to store
            information including visitors' preferences, and the pages on the
            website that the visitor accessed or visited.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          2. How We Use Your Information
        </h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Send you emails (newsletters) regarding updates and other
            information related to the website.
          </li>
          <li>Find and prevent fraud.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          3. Google DoubleClick DART Cookie
        </h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses
          cookies, known as DART cookies, to serve ads to our site visitors
          based upon their visit to www.website.com and other sites on the
          internet. However, visitors may choose to decline the use of DART
          cookies by visiting the Google ad and content network Privacy Policy
          at the following URL –{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://policies.google.com/technologies/ads
          </a>
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          4. Advertising Partners Privacy Policies
        </h2>
        <p>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of The View Island.
        </p>
        <p>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on The View Island, which are
          sent directly to users' browser. They automatically receive your IP
          address when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </p>
        <p className="italic text-sm text-gray-500">
          Note that The View Island has no access to or control over these
          cookies that are used by third-party advertisers.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          5. GDPR Data Protection Rights
        </h2>
        <p>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <strong>The right to access</strong> – You have the right to request
            copies of your personal data.
          </li>
          <li>
            <strong>The right to rectification</strong> – You have the right to
            request that we correct any information you believe is inaccurate.
          </li>
          <li>
            <strong>The right to erasure</strong> – You have the right to
            request that we erase your personal data, under certain conditions.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          6. Consent
        </h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">
          7. Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact
          us:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>By email: privacy@theviewisland.com</li>
          <li>
            By visiting this page on our website:{" "}
            <a
              href="/contact"
              className="text-blue-600 underline"
            >
              https://theviewisland.com/contact
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}