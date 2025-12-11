import { connectDB } from '@/lib/db';
import Article from '@/models/Article';
import Report from '@/models/Report';
import PartnershipApplication from '@/models/PartnershipApplication';

export default async function AdminDashboard() {
  await connectDB();
  const [articlesCount, reportsCount, partnershipsCount] = await Promise.all([
    Article.countDocuments(),
    Report.countDocuments({ status: 'open' }),
    PartnershipApplication.countDocuments({ status: 'new' }),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Articles</h2>
          <p className="text-3xl font-bold">{articlesCount}</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Open Reports</h2>
          <p className="text-3xl font-bold text-red-500">{reportsCount}</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">New Partnerships</h2>
          <p className="text-3xl font-bold text-blue">{partnershipsCount}</p>
        </div>
      </div>
    </div>
  );
}
