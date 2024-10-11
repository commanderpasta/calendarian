import { Line, ResponsiveLine, Serie } from "@nivo/line";
import { AxisProps } from "@nivo/axes";
import dayjs from "dayjs";

interface TrendChartProps {
    data: Serie[];
}

export default function TrendChart(props: TrendChartProps) {
    const axisY: AxisProps = {
        tickValues: [1, 2, 3, 4, 5],
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
        //format: ".0"
    };

    const axisX: AxisProps = {
        format: (d: Date) => dayjs(d).format("DD/MM"),
        legend: "past 90 days",
        legendPosition: "middle"
    };

    const gridYValues = [1, 2, 3, 4, 5];
    //gridYValues = [1, 2, 3, 4, 5];

    return (
        <div className="w-full h-5/6 lg:h-1/2">
            <ResponsiveLine
                data={props.data}
                gridYValues={gridYValues}
                axisBottom={axisX}
                axisLeft={axisY}
                xScale={{
                    type: "time",
                    min: dayjs().subtract(30, "days").toDate(),
                    max: dayjs().toDate()
                }}
                axisRight={axisY}
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                curve="catmullRom"
                colors="#00a2ae"
            />
        </div>
    );
}
