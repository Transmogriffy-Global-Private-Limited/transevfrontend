import React, { useState } from 'react';

// Mock reports data
const mockReports = [
  {
    id: 1,
    chargerId: 'CHG-00123',
    location: 'Green City Mall, Downtown',
    issue: 'Broken charging cable',
    reportedBy: 'john_doe',
    date: '2025-04-17',
  },
  {
    id: 2,
    chargerId: 'CHG-00456',
    location: 'Tech Park, Zone B',
    issue: 'Overcharging without proper billing',
    reportedBy: 'jane_smith',
    date: '2025-04-18',
  },
];

const AdminReport = () => {
  const [reports, setReports] = useState(mockReports);

  const handleDismiss = (id) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const handleTakeAction = (id) => {
    alert(`Admin will investigate and take action on report ID: ${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">⚡ Admin Dashboard – Charger Reports</h1>

      {reports.length === 0 ? (
        <p className="text-gray-500">No pending reports.</p>
      ) : (
        reports.map(report => (
          <div key={report.id} className="bg-white border border-gray-200 shadow-sm rounded-lg p-5 mb-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Charger ID: {report.chargerId}</h2>
                <p className="text-gray-600 text-sm mb-1">📍 Location: {report.location}</p>
                <p className="text-gray-800 font-medium">Issue: {report.issue}</p>
                <p className="text-sm text-gray-500 mt-1">Reported by <span className="font-semibold">{report.reportedBy}</span> on {report.date}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleTakeAction(report.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Take Action
              </button>
              <button
                onClick={() => handleDismiss(report.id)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminReport;
