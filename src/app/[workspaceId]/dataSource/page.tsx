"use client";

import { useState } from "react";
import { DataSourceHeader } from "@/components/dataSources/data-source-header";
import { StatsCard } from "@/components/dataSources/stats-card";
import { TabNavigation } from "@/components/dataSources/tab-navigation";
import { EmptyState } from "@/components/dataSources/empty-state";
import type { SampleData, TabItem, TabType } from "@/types/dataSource";
// import { DatabaseIcon, FileTextIcon, ClockIcon } from "lucide-react"
import { Database, FileText, Clock } from "lucide-react";
import { DataTable } from "@/components/dataSources/data-table";
import { ActivityLogs } from "@/components/dataSources/activity-logs";
import { ScheduleReset } from "@/components/dataSources/schedule-reset";

export default function DataSourcePage() {
  // const [activeTab, setActiveTab] = useState<"database" | "logs" | "schedule">("database")
  const [activeTab, setActiveTab] = useState<TabType>("database");

  const tabs: TabItem[] = [
    {
      id: "database",
      label: "Database",
      icon: <Database className="w-4 h-4" />,
    },
    { id: "logs", label: "Logs", icon: <FileText className="w-4 h-4" /> },
    { id: "schedule", label: "Schedule", icon: <Clock className="w-4 h-4" /> },
  ];

  const [sampleData, setSampleData] = useState<SampleData>({
    products: [],
    logs: [],
    hasData: false,
  });

  const handleAddSample = () => {
    const sampleProducts = [
      { id: 1, name: "Shoes", price: 11.25, created_date: "2025-08-15" },
      { id: 2, name: "Shirt", price: 12.0, created_date: "2025-08-16" },
      { id: 3, name: "Skirt", price: 25.99, created_date: "2025-08-16" },
    ];

    const sampleLogs = [
      {
        id: "1",
        title: "Data Import Complete",
        description: "Successfully imported 3 records from products.csv",
        user: "Keadaron@gmail.com",
        action: "IMPORT" as const,
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        title: "Product Deleted",
        description: "Removed Old Product from catalog",
        user: "admin@gmail.com",
        action: "DELETE" as const,
        timestamp: "5 hours ago",
      },
      {
        id: "3",
        title: "New Product Created",
        description: "Added new product Clothes to the catalog",
        user: "API Request",
        action: "CREATE" as const,
        timestamp: "1 week ago",
      },
      {
        id: "4",
        title: "Product Updated",
        description: "Updated Shoes - price",
        user: "API Request",
        action: "UPDATE" as const,
        timestamp: "1-Aug-2025",
      },
    ];

    setSampleData({
      products: sampleProducts,
      logs: sampleLogs,
      hasData: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <DataSourceHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={<Database className="w-6 h-6 text-teal-400" />}
            value="0"
            label="Total Field"
          />
          <StatsCard
            icon={<FileText className="w-6 h-6 text-teal-400" />}
            value="0"
            label="Total Record"
          />
          <StatsCard
            icon={<Clock className="w-6 h-6 text-teal-400" />}
            value="0"
            label="Last Update"
          />
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800">
          {/* <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} /> */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* <div className="p-8">
            {activeTab === "database" && <EmptyState />}
            {activeTab === "logs" && (
              <div className="text-center py-12">
                <p className="text-slate-400">Data logs will appear here</p>
              </div>
            )}
            {activeTab === "schedule" && (
              <div className="text-center py-12">
                <p className="text-slate-400">
                  Schedule reset options will appear here
                </p>
              </div>
            )}
          </div> */}

          <div className="p-8">
            {activeTab === "database" &&
              (sampleData.hasData ? (
                <DataTable products={sampleData.products} />
              ) : (
                <EmptyState onAddSample={handleAddSample} />
              ))}
            {activeTab === "logs" &&
              (sampleData.hasData ? (
                <ActivityLogs logs={sampleData.logs} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">Data logs will appear here</p>
                </div>
              ))}
            {activeTab === "schedule" &&
              (sampleData.hasData ? (
                <ScheduleReset />
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">
                    Schedule reset options will appear here
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
