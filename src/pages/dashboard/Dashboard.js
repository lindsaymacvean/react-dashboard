import React, {Component} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Table
} from 'reactstrap';


import Widget from '../../components/Widget';

// Chart
import BarChart from '../charts/charts/BarChart';

import { fetchPosts } from '../../actions/posts';
import s from './Dashboard.scss';
import SimpleBarChart from '../charts/charts/BarChart';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ {name: 'Active Users', Active: 0, Inactive: 0} ]
    }
  }
  
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    posts: [],
    isFetching: false,
  };

  state = {
    isDropdownOpened: false
  };

  componentWillMount() {
    // Domain and API endpoints which are used for requests:
    const proxyDomain = 'https://invotra-api-cors-proxy.herokuapp.com/'
    // const proxyDomain = 'http://localhost:5000/';
    const domain = `${proxyDomain}https://ninja-dev.invotra.com/api/v0.3/`;
    const apis = {
      login: `${domain  }sessions/login`,
      get_all_users: `${domain  }users/search?limit=3000`,
      get_users: `${domain  }users/`,
      get_job_roles: `${domain  }job_roles/`,
      get_teams: `${domain  }teams/`,
      get_sites: `${domain  }locations/sites/`,
      get_buildings: `${domain  }locations/buildings/`,
      get_floors: `${domain  }locations/floors/`,
      get_spaces: `${domain  }locations/spaces/`
    };
    const authentication_user = {
      username: 'abel carroll',
      password: '4k4g3r4u53r'
    };
    fetch(apis.login, {
      method: 'post',
      headers: {
        "Accept": 'application/json',
        "Content-type": 'application/json'
      },
      body: JSON.stringify(authentication_user),
      credentials: 'include'
    })
    .then(() => fetch(apis.get_all_users, {credentials: 'include'}))
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .then(response => {
      var count = 0, total = 0;
      for (var i = 0; i<response.results.length; i++) {
        var result = response.results[i];
        total++;
        if (result.status === "Active") {
          count++;
        }
      }

      let data = this.state.data;

      data[0].Active = count;
      data[0].Inactive = total-count;
      console.log(data);

      this.setState({ data });
      //SimpleBarChart.forceUpdate();
    })
    this.props.dispatch(fetchPosts());
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Dashboard</h1>
        <Row>
          <Col sm={12} md={6}> 
            <Widget
              title={<h5>Simple <span className="fw-semi-bold">Bar Chart</span></h5>}>
              <BarChart data={this.state.data} />
            </Widget>
          </Col>
          <Col sm={12} md={6} />
        </Row>
        <Row>
          <Col sm={6} />
          <Col sm={6} />
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(withStyles(s)(Dashboard));
