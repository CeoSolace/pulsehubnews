export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">About PulseHub.Space</h1>
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p>
          PulseHub.Space is a trusted source for global esports news, UK politics, technology trends, 
          and thoughtful opinion pieces. Founded by Covex CeoSolace, we deliver factual, unbiased coverage 
          with editorial integrity at our core.
        </p>
        <h2>Our Mission</h2>
        <p>
          To provide accurate, timely, and insightful coverage of the stories that matter most to our readers, 
          while maintaining the highest standards of journalistic ethics and transparency.
        </p>
        <h2>Editorial Standards</h2>
        <p>
          Our content is rigorously fact-checked and sourced. Opinion pieces are clearly labeled and represent 
          the views of individual authors, not PulseHub.Space as an organization.
        </p>
        <h2>Connect With Us</h2>
        <p>
          Follow us on Twitter <a href="https://twitter.com/truthinesports" className="text-blue hover:underline">@truthinesports</a> 
          for real-time updates and community engagement.
        </p>
      </div>
    </div>
  );
}
