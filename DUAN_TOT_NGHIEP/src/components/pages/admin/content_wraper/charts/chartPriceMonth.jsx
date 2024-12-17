import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts';

const chartSetting = {
    xAxis: [
        {
            label: 'Biểu đồ tính tổng doanh thu theo tháng',
        },
    ],
    width: 840,
    height: 500,
};

function ChartPriceMonth() {
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        const fetchRevenueData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/reportRoutes/totalPriceOrderByMonth');
                const formattedData = response.data.map((item) => ({
                    month: `Tháng ${item.month}`, // Format tháng
                    price: item.totalRevenue, // Gán doanh thu
                }));
                setDataset(formattedData);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchRevenueData();
    }, []);

    return (
        <>
            <div className='chartPriceOrderMonth'>
                <BarChart
                    yAxis={[
                        { scaleType: 'band', dataKey: 'month', labelRotation: -45 }, // Xoay nhãn 45 độ
                    ]}
                    dataset={dataset}
                    // yAxis={[{ scaleType: 'band', dataKey: 'month' }]} // Hiển thị tháng ở trục dọc
                    series={[{ dataKey: 'price', label: 'Doanh thu (VNĐ)' }]} // Hiển thị doanh thu
                    layout="horizontal"
                    {...chartSetting}
                    margin={{ top: 20, right: 20, bottom: 40, left: 80 }} // Tăng khoảng cách
                />
            </div>
        </>
    );
}

export default ChartPriceMonth;
