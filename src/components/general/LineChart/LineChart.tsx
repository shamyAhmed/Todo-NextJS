'use client';
import { recordType } from "@/types/dashboard";
import React, { FC, ReactNode, useState, useMemo, useRef } from "react";
import { dayInMilliSeconds } from "@/constants";
import { Line } from 'react-chartjs-2';
import { removeTimeISO } from "@/utils/time";
import { setWeek } from "date-fns";

interface props {
    dataset: recordType[],
    focusOn: "success" | "overdue" | "compare"
}


//TODO: use deferred value to make this perform better.


//TODO: finish implementing the graph.
const LineChart: FC<props> = ({dataset, focusOn}) => {
    const [currentWeek, setCurrentWeek] = useState<number>(0);

    const currentDays = useMemo(() => {
        let currentDate = new Date(new Date().getTime() + dayInMilliSeconds * (-currentWeek * 7));
        const daysArray = new Array(7).fill(0).map((_, index) => {
            return removeTimeISO(new Date(currentDate.getTime() - dayInMilliSeconds * index))
        })
        return daysArray
    }, [dataset, currentWeek])
    let activeIndex = 0;
    return (
        <div className="line-chart-container">
            <Line 
                options={{
                    elements: {
                        point: {
                            radius: 0
                        },
                    },
                    scales: {
                        y: {
                            suggestedMin: 8,
                            min: 0,
                            labels: ["number of years"],
                        },
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                                minUnit: "day",
                                displayFormats: {
                                    day: "dd/MM"
                                },
                                
                            },
                            grid: {
                                offset: false,
                                lineWidth: 0
                                
                            },
                            ticks: {
                                stepSize: 1,
                            },

                            
                        }
                    },
                    plugins: {
                        tooltip: {
                            enabled: false
                        },
                        filler: {
                            drawTime: "beforeDraw",
                            propagate: true,

                        },
                        legend: {
                            display: false
                        }
                    }

                }}
                data={{
                    labels: currentDays,
                    datasets: [{
                        data: currentDays.map((date) => {
                            if(removeTimeISO(dataset[activeIndex]?.recordDate) === date){
                                if(focusOn == "success"){
                                    return dataset[activeIndex++].completed
                                }else if (focusOn == "overdue"){
                                    return dataset[activeIndex++].overDue
                                }
                            }else{
                                return 0
                            }
                        }),
                        backgroundColor: "#51db8b",
                        label: "Completed work",
                        fill: true
                    }]
                }}
            />
        </div>
    )
}

export default LineChart;