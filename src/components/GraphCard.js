import React from 'react';
import ChartistGraph from 'react-chartist';

class GraphCard extends React.Component{

    //TODO_1: Add data and input to graph for last 24 hours

    render() {
        let data = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: [
              [12, 9, 7, 8, 5],
            ]
        };
    
        let options = {
          height: '100%',
          color: 'white',
          showPoint: false
        };
    
        let type = 'Line'
    
        return (
          <div style={{ height: '100%' }}>
            <ChartistGraph style={{ height: '100%' }} data={data} options={options} type={type} />
          </div>
        )
    }
};

export default GraphCard;