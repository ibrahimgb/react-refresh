import { BarChart } from '@mui/x-charts/BarChart'
function MyBarChart({
    index,
    color,
    randomNumberList,
}: {
    index: number
    color: string
    randomNumberList: number[]
}) {
    // console.log(randomNumberList)
    const list = randomNumberList ?? [0]

    return (
        <>
            <div className="chart_box">
                <BarChart
                    xAxis={[
                        {
                            scaleType: 'band',
                            data: list.map((item, index) => index),
                        },
                    ]}
                    series={[{ data: list, color: color }]}
                    height={300}
                    width={randomNumberList.length > 70 ? 1600 : undefined}
                />
            </div>

            <h3>channel {index}</h3>
        </>
    )
}

export default MyBarChart
