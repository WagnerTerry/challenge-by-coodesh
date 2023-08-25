import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
    data: { name: string; sales: number }[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} className="bar-chart">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;