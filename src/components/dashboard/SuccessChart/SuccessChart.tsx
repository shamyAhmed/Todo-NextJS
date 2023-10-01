'use client';
import React, { FC } from "react";
import LabelledChart from "@/components/general/LabelledChart/LabelledChart";
import { recordType } from "@/types/dashboard";

interface props {
    data: recordType[]
}
const SuccessChart: FC<props> = ({data}) => {
    return (
        <div className="success-chart-container">
            <LabelledChart chart="line" dataset={data} label="Success Rate" focusOn="success" />
        </div>
    )
}


export default SuccessChart;