import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart(props) {
    return (
        <div className='lineChart-container'>
            <LineChart
                xAxis={[{ data: props.X }]}
                series={[
                    {
                        data: props.Y,
                        label: "Sales"
                    },
                ]}
                width={props.width}
                height={props.height}
                
            />
        </div>
    );
}