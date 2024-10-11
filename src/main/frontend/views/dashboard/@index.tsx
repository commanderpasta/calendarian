import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import TrendRecord from "Frontend/generated/com/ianmatos/calendarian/services/DashboardService/TrendRecord";
import { DashboardService } from "Frontend/generated/endpoints";
import { useEffect, useMemo, useState } from "react";
import TrendChart from "Frontend/components/TrendChart";
import dayjs from "dayjs";
import Mood from "Frontend/generated/com/ianmatos/calendarian/data/calendar/CalendarEntry/Mood";
import { Datum, Serie } from "@nivo/line";

export const config: ViewConfig = {
    loginRequired: true,
    menu: {
        order: 1
    }
};

const moodToNumber = {
    [Mood.VERYPOSITIVE]: 5,
    [Mood.POSITIVE]: 4,
    [Mood.NEUTRAL]: 3,
    [Mood.NEGATIVE]: 2,
    [Mood.VERYNEGATIVE]: 1
};

export default function Dashboard() {
    const [trend, setTrend] = useState<TrendRecord[]>();

    useEffect(() => {
        const fetchTrend = async () => {
            const data = await DashboardService.getMyTrend();
            setTrend(data);
        };

        try {
            fetchTrend();
        } catch (e) {
            return;
        }
    }, []);

    const moodChartData = useMemo((): Serie[] => {
        if (!trend) {
            return [];
        }

        const linePoints: Datum[] = trend.map((dataPoint) => {
            return {
                x: dayjs(dataPoint.date).toDate(),
                y: moodToNumber[dataPoint.mood || Mood.NEUTRAL]
            };
        });

        const result = [
            {
                id: "xd",
                color: "#00a2ae",
                data: linePoints
            }
        ];

        console.debug(result);
        return result;
    }, [trend]);

    return (
        <main className="m-4 h-full">
            <h2 className="text-2xl">Your 90 day trend.</h2>
            {moodChartData ? <TrendChart data={moodChartData} /> : <></>}
        </main>
    );
}
