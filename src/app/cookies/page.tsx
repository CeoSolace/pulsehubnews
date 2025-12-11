export default function CookiesPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p>
          PulseHub.Space uses minimal cookies to enhance your user experience and for essential site functionality.
        </p>
        <h2>Types of Cookies We Use</h2>
        <ul>
          <li><strong>Essential Cookies</strong>: Required for basic site functionality</li>
          <li><strong>Analytics Cookies</strong>: Help us understand how visitors interact with our site (stored in MongoDB)</li>
          <li><strong>Preference Cookies</strong>: Remember your settings like dark/light mode</li>
        </ul>
        <h2>Your Choices</h2>
        <p>
          You can accept or reject non-essential cookies through our cookie banner. 
          Rejecting analytics cookies will not impact your ability to use the site.
        </p>
        <p>
          By continuing to use PulseHub.Space, you consent to our use of cookies as described in this policy.
        </p>
      </div>
    </div>
  );
}
