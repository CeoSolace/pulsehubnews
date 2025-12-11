import { connectDB } from '@/lib/db';
import PartnershipApplication from '@/models/PartnershipApplication';
import { Button } from '@/components/ui/button';

export default async function PartnershipsPage() {
  await connectDB();
  const applications = await PartnershipApplication.find().sort({ submittedAt: -1 });

  const handleReview = async (id: string) => {
    await fetch(`/api/partnerships/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'reviewed' }),
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Partnership Applications</h1>
      
      <div className="space-y-4">
        {applications.map((app: any) => (
          <div key={app._id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">{app.organizationName}</h3>
                <p className="text-gray text-sm">Submitted: {new Date(app.submittedAt).toLocaleString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                app.status === 'new' 
                  ? 'bg-blue/10 text-blue' 
                  : 'bg-green-500/10 text-green-500'
              }`}>
                {app.status}
              </span>
            </div>
            
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-medium">Contact:</span> {app.contactName} ({app.contactEmail})</p>
                <p><span className="font-medium">Type:</span> {app.organizationType}</p>
                {app.website && (
                  <p><span className="font-medium">Website:</span> <a href={app.website} className="text-blue hover:underline">{app.website}</a></p>
                )}
              </div>
              <div>
                <p><span className="font-medium">Message:</span></p>
                <p className="mt-1">{app.message}</p>
                {app.fileUrl && (
                  <p className="mt-2">
                    <a href={app.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                      View Attachment
                    </a>
                  </p>
                )}
              </div>
            </div>
            
            {app.status === 'new' && (
              <div className="mt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue hover:bg-blue/90 text-white"
                  onClick={() => handleReview(app._id)}
                >
                  Mark as Reviewed
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
