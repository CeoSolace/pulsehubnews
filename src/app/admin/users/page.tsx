import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { Button } from '@/components/ui/button';

export default async function UsersPage() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 });

  const roleColors: Record<string, string> = {
    owner: 'bg-purple-500/10 text-purple-500',
    support: 'bg-green-500/10 text-green-500',
    article_writer: 'bg-blue-500/10 text-blue-500',
    contributor: 'bg-gray/10 text-gray',
    donator: 'bg-yellow-500/10 text-yellow-500',
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray/10">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id} className="border-t hover:bg-gray/5">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${roleColors[user.role]}`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
