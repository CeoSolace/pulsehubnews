export default function ContactPage() {
  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">General Inquiries</h2>
          <p className="text-gray">Email: <a href="mailto:hello@pulselhub.space" className="text-blue hover:underline">hello@pulselhub.space</a></p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Press & Media</h2>
          <p className="text-gray">Email: <a href="mailto:press@pulselhub.space" className="text-blue hover:underline">press@pulselhub.space</a></p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
          <p className="text-gray">
            Twitter: <a href="https://twitter.com/truthinesports" className="text-blue hover:underline">@truthinesports</a>
          </p>
        </div>
        
        <div className="bg-gray/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Mailing Address</h3>
          <p className="text-gray">
            PulseHub.Space<br />
            c/o Covex CeoSolace<br />
            United Kingdom
          </p>
        </div>
      </div>
    </div>
  );
}
