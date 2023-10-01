'use client'
import { FC } from "react"
import LineChart from "../LineChart/LineChart"
import { recordType } from "@/types/dashboard"
import {Chart as ChartJS, Tooltip, Legend, Filler, LineController, LineElement, PointElement, LinearScale, DoughnutController, ArcElement, Decimation, CategoryScale, TimeScale} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    Tooltip, 
    Legend, 
    Filler, 
    LineController, 
    LineElement, 
    PointElement, 
    LinearScale, 
    DoughnutController, 
    ArcElement, 
    Decimation,
    CategoryScale,
    TimeScale
);

interface props {
    chart: "doughnut" | "line"
    label: string
    className?: string
    dataset: recordType[]
    focusOn: "success" | "overdue" | "compare"
}

const LabelledChart: FC<props> = ({label, chart, className = "", dataset, focusOn}) => {
    const chartComponent = chart === "line" ? <LineChart dataset={dataset} focusOn={focusOn} /> : <div>Doughnut</div>
    return (
        <div className={`labelled-chart-container bg-white min-h-[250px] rounded-md p-5 flex flex-col max-w-[400px] ${className}`}>
            <p className="chart-label text-xl font-semibold">{label}</p>
            <div className="flex-1 flex justify-center items-center p-2">
                {chartComponent}
            </div>
        </div>
    )
}

export default LabelledChart