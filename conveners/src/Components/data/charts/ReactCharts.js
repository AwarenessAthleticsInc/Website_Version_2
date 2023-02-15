import { Bar } from 'react-chartjs-2';

function ReactChart() {
    const data = {
        'January': 4,
        'February': 7,
        'March': 1,
        'April': 8,
        'May': 35,
        'June': 12,
        'July': 26,
        'August': 7,
        'September': 6,
        'October': 6,
        'November': 6,
        'December': 1
    };
    return <Bar
        data={data}
        height={400}
        width={600}
        options={{
            maintainAspectRatio: false
        }}
    />
}
export default ReactChart;