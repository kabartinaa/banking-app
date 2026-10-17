"use client"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import React from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughNutChart = ({accounts}:DoughnutChartProps) => {
    const data ={
        datasets: [
            {
                label:'Banks',
                data:[243, 156, 12],
                backgroundColor:['#0747b6' , '#2265d8' ,'#2f91fa']
             }
        ],
        labels:['Bank A', 'Bank B', 'Bank C']
    }
  return (
    <Doughnut data={data}
    options={{
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            }
        }
    }}
    />
  )
}

export default DoughNutChart