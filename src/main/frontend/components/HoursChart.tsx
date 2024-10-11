import { Line, ResponsiveLine, Serie } from "@nivo/line";
import { AxisProps } from "@nivo/axes";
import dayjs from "dayjs";
import { Suspense } from "react";
import LoadingIndicator from "./LoadingIndicator";

interface TrendChartProps {
    data: Serie[];
}

export default function TrendChart(props: TrendChartProps) {
    const axisX: AxisProps = {
        format: (d: Date) => dayjs(d).format("DD/MM"),
        legend: "past 90 days",
        legendPosition: "middle"
    };
    return (
        <div className="w-full h-5/6 lg:h-1/3">
            <Suspense fallback={<LoadingIndicator />}>
                <ResponsiveLine
                    data={props.data}
                    axisBottom={axisX}
                    xScale={{
                        type: "time",
                        min: dayjs().subtract(30, "days").toDate(),
                        max: dayjs().toDate()
                    }}
                    lineWidth={3}
                    margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
                    curve="monotoneX"
                    colors="#00a2ae"
                />
            </Suspense>
        </div>
    );
}
