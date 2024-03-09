import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardHeader, Box } from "@mui/material";
import api from '../../api/posts'

export default function ChartBar() {
    // Sample data
    const [view, setView] = useState([])
    const [like, setLike] = useState([])

    useEffect(() => {      
        async function fetchData() {
            // You can await here
            await api.get('api/cms/dashboard/getViewByMonths').then((res) => {
                setView(res.data.getViewByMonths)            
            })
            await api.get("/api/cms/dashboard/getLikeByMonths").then((res) => {
                setLike(res.data.getLikeByMonths)
            }) 
        }
        fetchData();  
    }, [])

    // const view = [12000, 14000, 24000, 23000, 13000, 12000, 14000, 24000, 23000, 13000, 23000, 13000];
    // const like = [6000, 7000, 8000, 12000, 14000, 24000, 23000, 13000, 12000, 14000, 24000, 23000];

    var options = {
        series: [{
            name: 'View',
            color: '#472CC9',
            data: view,
        }, {
            name: 'Like',
            color: '#797E7F',
            data: like,
        }],
        chart: {
            type: 'bar',
            height: 350,
        },

        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan', '', 'Feb', '', 'Mar', '', 'Apr', '', 'May', '', 'Jun', '', 'Jul', '', 'Aug', '', 'Sep', '', 'Oct', '', 'Nov', '', 'Dec', '',],
        },

        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return " " + val
                }
            }
        }
    };

    return (
        <>
            <CardHeader />
            <Box dir="ltr" width="98%">
                <ReactApexChart
                    options={options}
                    series={options.series}
                    type="bar"
                    height={400}
                />
            </Box>
        </>
    )
}

