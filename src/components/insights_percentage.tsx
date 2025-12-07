import { PieChart } from "@mui/x-charts";

const data = [
  { label: "Group A", value: 80, color: "#359eff" },
  { label: "Group C", value: 20, color: "#ff6467" },
];

const settings = {
  width: 400,
  height: 300,
  hideLegend: true,
};

const InsightsPercentage = () => {
  return (
    // ADD relative HERE to make this the positioning context for its children
    <div className="relative flex-1 bg-white/20 rounded-lg flex flex-col  justify-center p-4">
      <div className="p-4">
        <h3 className="text-white font-bold text-2xl mb-2">System Health</h3>
        <p className="font-medium text-md text-white/50">
          System is at 80% Health
        </p>
      </div>

      {/* This element is absolutely positioned relative to the new parent.
          You may need to adjust the '-bottom-[50px]' value after this change. */}
      <h3 className="text-white font-bold text-5xl mb-2 absolute self-center bottom-32">
        80%
      </h3>

      <PieChart
        series={[
          {
            innerRadius: 100,
            outerRadius: 200,
            data,
            startAngle: -90,
            endAngle: 90,
            cornerRadius: 5,
            cy: 200,
          },
        ]}
        {...settings}
      />

      {/* This element is absolutely positioned relative to the new parent.
          You may need to adjust the '-bottom-[100px]' value after this change. */}
      <div className="flex flex-row px-4 absolute bottom-18 justify-between w-[350px] self-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="size-4 bg-(--primary)" />
          <p className="font-normal text-sm text-white/50">Stable Devices</p>
        </div>

        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="size-4 bg-red-400" />
          <p className="font-normal text-sm text-white/50">Unstable Devices</p>
        </div>
      </div>
    </div>
  );
};

export default InsightsPercentage;
