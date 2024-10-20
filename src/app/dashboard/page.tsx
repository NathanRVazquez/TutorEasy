import React from "react";
import AnalyticsCard from "@/components/AnalyticsCard";

export default function DashboardHomePage() {
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
          <AnalyticsCard
            title="Engagement"
            data={50}
            filterData={30}
            range={"semester"}
          />
          <AnalyticsCard
            title="Active TAs"
            data={8}
            filterData={-4}
            range={"month"}
          />
          <AnalyticsCard
            title="Tutoring Sessions"
            data={24}
            filterData={0}
            range={"week"}
          />
        </div>
      </div>
    </div>
  );
}
