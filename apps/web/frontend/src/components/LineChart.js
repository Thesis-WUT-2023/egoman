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
                    },
                ]}
                width={props.width}
                height={300}
            />
        </div>
    );
}