import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import AdminSidebar from '../Admin_sidebar';
import AdminNavbar from '../Admin_navbar';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf';
const BASE_URL = 'http://192.168.0.103:3000';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [reports, setReports] = useState([]);
  const [stockAnalysis, setStockAnalysis] = useState([]);
  const [productAnalytics, setProductAnalytics] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const contactRes = await fetch(`${BASE_URL}/contact/getallcontacts`, {
        headers: { 'API-KEY': API_KEY },
      });
      const contactData = await contactRes.json();
      setContacts(contactData?.contacts || contactData?.data || []);

      const stockRes = await fetch(`${BASE_URL}/analytics/product_stock_analysis`, {
        headers: { 'API-KEY': API_KEY },
      });
      const stockData = await stockRes.json();
      setStockAnalysis(stockData?.product_stock_analysis || []);

      const productRes = await fetch(`${BASE_URL}/analytics/product_analytics`, {
        headers: { 'API-KEY': API_KEY },
      });
      const productData = await productRes.json();
      setProductAnalytics(productData?.product_analytics || []);

      setReports([
        {
          id: 1,
          chargerId: 'CHG-00123',
          location: 'Green City Mall',
          issue: 'Broken charging cable',
          reportedBy: 'john_doe',
          date: '2025-04-17',
        },
        {
          id: 2,
          chargerId: 'CHG-00456',
          location: 'Tech Park Zone B',
          issue: 'Overcharging issue',
          reportedBy: 'jane_smith',
          date: '2025-04-18',
        },
      ]);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleDismiss = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const stockChart = {
    labels: stockAnalysis.map((item) => item.product_name),
    datasets: [
      {
        label: 'Remaining Stock',
        data: stockAnalysis.map((item) => item.remaining_stock),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const productChart = {
    labels: productAnalytics.map((item) => item.product_name),
    datasets: [
      {
        label: 'Total Sales',
        data: productAnalytics.map((item) => item.total_sales),
        backgroundColor: 'rgba(255,99,132,0.6)',
      },
    ],
  };

  const displayedContacts = showAllContacts ? contacts : contacts.slice(0, 4);

  return (
    <div className=" min-h-screen bg-gradient-to-r from-green-50 to-green-100 text-gray-800 w-full">
      {/* Navbar */}
      <AdminNavbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className="w-20 md:w-56">
          <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">⚡ Admin Report</h1>

          {/* Charts Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">📦 Product Stock Analysis</h2>
              <Bar data={stockChart} />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">📊 Product Analytics</h2>
              <Bar data={productChart} />
            </div>
          </section>

          {/* Charger Reports Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">⚠️ Charger Reports</h2>
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded p-4 mb-4 shadow-md">
                <h3 className="font-bold text-lg mb-2">Charger ID: {report.chargerId}</h3>
                <p>
                  <strong>Location:</strong> {report.location}
                </p>
                <p>
                  <strong>Issue:</strong> {report.issue}
                </p>
                <p className="text-sm text-gray-500">
                  Reported by {report.reportedBy} on {report.date}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => alert(`Taking action on report ID: ${report.id}`)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Take Action
                  </button>
                  <button
                    onClick={() => handleDismiss(report.id)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Contact Submissions Section */}
          <section className="mb-6">
  <h2 className="text-xl font-semibold mb-4">📞 Contact Submissions</h2>
  <button
    onClick={() => setShowAllContacts(!showAllContacts)}
    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    {showAllContacts ? 'Hide Contacts' : 'Show All Contacts'}
  </button>

  <div className="overflow-x-auto bg-white rounded-lg shadow-md max-w-full">
    <table className="min-w-[800px] table-auto text-sm w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Telephone</th>
          <th className="px-4 py-2 text-left">Message</th>
        </tr>
      </thead>
      <tbody>
        {([...displayedContacts]
          .reverse() // Make newest on top
          .slice(0, showAllContacts ? displayedContacts.length : 5) // Show top 5 or all
        ).map((contact) => (
          <tr key={contact.id} className="border-t">
            <td className="px-4 py-2">{contact.firstname} {contact.lastname}</td>
            <td className="px-4 py-2">{contact.email}</td>
            <td className="px-4 py-2">{contact.telephone}</td>
            <td className="px-4 py-2">{contact.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

               
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
