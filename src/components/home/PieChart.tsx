import { FC, memo } from "react";
import { PieChart as RechartPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

/**
 * ==> Props Interface
 */
interface IProps {}

/**
 * ==> Component
 */
const PieChart: FC<IProps> = () => {
  const data = [
    { name: 'Group A', value: 1000 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 2000 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="wrapper w-full h-[300px] ">
      <ResponsiveContainer width="100%" height="100%">
        <RechartPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_,index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </RechartPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(PieChart);
