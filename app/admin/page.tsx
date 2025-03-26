import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";

const AdminDashboard = () => {
  const { logout } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <p className="mb-4">Welcome to your admin dashboard!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
            <p>Create and manage your blog posts here.</p>
            <button className="mt-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
              New Post
            </button>
          </div>

          {/* Add more admin features here */}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
