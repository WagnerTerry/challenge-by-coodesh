import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface PieChartProps {
    title?: string;
    data: { name: string; value: number }[];
}

const COLORS = ['#4CAF50', '#FF6384', '#FFCE56', '#4CAF50', '#9C27B0'];

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChart;