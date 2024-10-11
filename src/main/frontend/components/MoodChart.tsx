import { Line, ResponsiveLine, Serie } from "@nivo/line";
import { AxisProps } from "@nivo/axes";
import dayjs from "dayjs";
import { Suspense } from "react";
import LoadingIndicator from "./LoadingIndicator";

interface MoodChartProps {
    data: Serie[];
}

export default function MoodChart(props: MoodChartProps) {
    const numberToMood: { [key: number]: string } = {
        [1]: "Very negative",
        [2]: "Negative",
        [3]: "Neutral",
        [4]: "Positive",
        [5]: "Very positive"
    };

    const axisMood: AxisProps = {
        tickValues: [1, 2, 3, 4, 5],
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (num: number) => {
            return numberToMood[num];
        }
    };

    const axisX: AxisProps = {
        format: (d: Date) => dayjs(d).format("DD/MM"),
        legend: "past 90 days",
        legendPosition: "middle"
    };

    const gridYValues = [1, 2, 3, 4, 5];
    //gridYValues = [1, 2, 3, 4, 5];

    return (
        <div className="w-full h-5/6 lg:h-1/3">
            <Suspense fallback={<LoadingIndicator />}>
                <ResponsiveLine
                    data={props.data}
                    gridYValues={gridYValues}
                    axisBottom={axisX}
                    axisLeft={axisMood}
                    xScale={{
                        type: "time",
                        min: dayjs().subtract(30, "days").toDate(),
                        max: dayjs().toDate()
                    }}
                    lineWidth={3}
                    margin={{ top: 20, right: 80, bottom: 30, left: 80 }}
                    curve="monotoneX"
                    colors="#00a2ae"
                    pointSize={10}
                />
            </Suspense>
        </div>
    );
}
