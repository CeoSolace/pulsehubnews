import { connectDB } from '@/lib/db';
import Report from '@/models/Report';

export default async function ReportsPage() {
  await connectDB();
  const reports = await Report.find().populate('articleId').sort({ submittedAt: -1 });

  const handleResolve = async (id: string) => {
    await fetch(`/api/reports/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'resolved' }),
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Article Reports</h1>
      
      <div className="space-y-4">
        {reports.map((report: any) => (
          <div key={report._id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">{report.articleTitle}</h3>
                <p className="text-gray-500 text-sm">Submitted: {new Date(report.submittedAt).toLocaleString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                report.status === 'open' 
                  ? 'bg-red-500/10 text-red-500' 
                  : 'bg-green-500/10 text-green-500'
              }`}>
                {report.status}
              </span>
            </div>
            
            <div className="mt-3">
              <p><span className="font-medium">Reason:</span> {report.reason}</p>
              {report.details && (
                <p className="mt-2"><span className="font-medium">Details:</span> {report.details}</p>
              )}
            </div>
            
            {report.status === 'open' && (
              <div className="mt-4 flex gap-2">
                <button
                  className="px-3 py-1.5 text-sm border border-red-500 text-red-500 hover:bg-red-500/10 rounded"
                  onClick={() => handleResolve(report._id)}
                >
                  Mark as Resolved
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
