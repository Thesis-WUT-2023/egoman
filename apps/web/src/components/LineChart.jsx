import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import { useEffect } from 'react';




export default function BasicLineChart(props) {


    return (
        <div className='lineChart-container'>
            <LineChart
                xAxis={[
                    {
                        scaleType: 'band',
                        data: props.X,
                        id: 'quarters',
                        label: 'Month',
                    }
                ]}
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