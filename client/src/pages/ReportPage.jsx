import React, { useEffect, useState } from 'react';
import api from "../lib/api"
import ReportCard from '../components/ReportCard';

export default function ReportPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get('/reports').then(res => setReports(res.data));
  }, []);

  return (
    <div className="p-6 grid gap-4">
      {reports.map((r, i) => (
        <ReportCard key={i} report={r} />
      ))}
    </div>
  );
}
