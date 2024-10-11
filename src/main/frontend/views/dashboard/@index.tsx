import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import TrendRecord from "Frontend/generated/com/ianmatos/calendarian/services/DashboardService/TrendRecord";
import { DashboardService } from "Frontend/generated/endpoints";
import { useEffect, useMemo, useState } from "react";
import MoodChart from "Frontend/components/MoodChart";
import dayjs from "dayjs";
import Mood from "Frontend/generated/com/ianmatos/calendarian/data/calendar/CalendarEntry/Mood";
import { Datum, Serie } from "@nivo/line";
import HoursChart from "Frontend/components/HoursChart";

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

        return [
            {
                id: "mood",
                color: "#00a2ae",
                data: linePoints
            }
        ];
    }, [trend]);

    const sleepChartData = useMemo((): Serie[] => {
        if (!trend) {
            return [];
        }

        const linePoints: Datum[] = trend.map((dataPoint) => {
            return {
                x: dayjs(dataPoint.date).toDate(),
                y: dataPoint.sleep
            };
        });

        return [
            {
                id: "sleep",
                color: "orange",
                data: linePoints
            }
        ];
    }, [trend]);

    return (
        <main className="m-4 h-full">
            <h1 className="text-2xl">Your 30 day trends.</h1>
            <h2 className="text-xl mt-2">Mood</h2>
            {moodChartData[0]?.data?.length > 0 ? <MoodChart data={moodChartData} /> : <>:(</>}
            <h2 className="text-xl">Sleep duration</h2>
            {sleepChartData[0]?.data?.length > 0 ? <HoursChart data={sleepChartData} /> : <>:(</>}
        </main>
    );
}
