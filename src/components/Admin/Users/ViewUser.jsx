import React, { useEffect, useState } from 'react';
import AdminSidebar from '../Admin_sidebar';
import AdminNavbar from '../Admin_navbar';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const BASE_URL = "http://192.168.0.106:8000/admin/view-users";
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
  const authToken = localStorage.getItem('auth_token');
  const limit = 100;
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 const [sidebarOpen, setSidebarOpen] = useState(true);
  // Function to fetch user details
  const fetchUserDetails = async (page) => {
    setLoading(true);
    const start = (page - 1) * limit + 1;
    const end = page * limit;

    try {
      const response = await fetch(`${BASE_URL}?limit=${start}-${end}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log('Response Data:', data);  // For debugging

      if (data && Array.isArray(data)) {
        setUsers(data);
        // Assuming the API returns total number of users or pages
        setTotalPages(Math.ceil(data.length / limit)); 
      } else {
        setError('No users found');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-gray-800">
    {/* User Navbar */}
    <AdminNavbar onToggleSidebar={toggleSidebar} />

    <div className="flex flex-1">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

    <div className="container mx-auto p-4 ml-62">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Manage Users</h1>

      {loading && <p className="text-center text-lg text-gray-300">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full table-auto bg-gray-800 text-white rounded-lg shadow-lg">
              <thead className="bg-gray-900">
                <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Profile Picture</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">User Id</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Email</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Phone</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Role</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-300">Registered On</th>
                
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700">
                     <td className="py-4 px-6 text-sm text-gray-300">
                      <img src={user.profile_picture} alt="Profile" className="w-12 h-12 rounded-full" />
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-300">{user.user_number}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{user.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{user.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{user.phone_number}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{user.role}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{new Date(user.created_at).toLocaleString()}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-4 text-lg text-gray-300">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </div>
    </div>
  );
};

export default UserList;
