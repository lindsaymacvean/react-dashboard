import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

class SimpleBarChart extends PureComponent {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      Active: PropTypes.number,
      Inactive: PropTypes.number,
    })).isRequired,
  }

	render () {
  	return (
      <ResponsiveContainer height={300} width='100%'>
        <BarChart 
          layout="vertical" 
          width={600} 
          height={300} 
          data={this.props.data} 
          margin={{top: 20, left: -10}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis type="number"/>
          <YAxis type="category" dataKey="name" />
          <XAxis stroke="#f3c363"/>
          <XAxis stroke="#eb3349"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="Active" stackId="a" fill="#f3c363" />
          <Bar dataKey="Inactive" stackId="a" fill="#eb3349" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default SimpleBarChart;
