import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AnalyticsCardProps = {
  title: string;
  data: number;
  filterData: number;
  range: string;
};

export default function AnalyticsCard({
  title,
  data,
  filterData,
  range,
}: AnalyticsCardProps) {
  let filterStringClassColor = "";
  let filterDataStringSign = "";

  if (Number(filterData) > 0) {
    filterStringClassColor = "text-green-500";
    filterDataStringSign = "+";
  } else if (Number(filterData) < 0) {
    filterStringClassColor = "text-red-500";
    filterDataStringSign = "-";
  } else {
    filterStringClassColor = "text-gray-500";
  }

  let filterRangeNumber = 0;

  if (range === "semester") {
    filterRangeNumber = 120;
  } else if (range === "month") {
    filterRangeNumber = 30;
  } else if (range === "week") {
    filterRangeNumber = 7;
  }

  return (
    <Card className="flex-1 md:flex-0 basis-full sm:basis-1/3 ">
      <CardHeader className="text-center md:text-left p-2 md:p-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center md:text-left p-2 pt-0 md:p-4 md:pt-0">
        <p className="font-bold text-3xl">{String(data)}</p>
      </CardContent>
      <CardFooter className="justify-center md:justify-start p-2 pt-0 md:p-4 md:pt-0">
        <p className={`${filterStringClassColor} font-semibold text-sm`}>
          <span className="font-bold text-base">{filterDataStringSign} </span>
          <span className="font-bold text-lg">{Math.abs(filterData)}</span> in
          the past {filterRangeNumber} days
        </p>
      </CardFooter>
    </Card>
  );
}
