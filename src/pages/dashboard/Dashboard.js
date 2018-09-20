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

import { fetchPosts } from '../../actions/posts';
import s from './Dashboard.scss';

class Dashboard extends Component {
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
    // var proxyDomain = 'https://invotra-api-cors-proxy.herokuapp.com/'
    var proxyDomain = 'http://localhost:5000/';
    var domain = proxyDomain+'https://ninja-dev.invotra.com/api/v0.3/';
    var apis = {
      login: domain + 'sessions/login',
      get_all_users: domain + 'users/search?limit=2000',
      get_users: domain + 'users/',
      get_job_roles: domain + 'job_roles/',
      get_teams: domain + 'teams/',
      get_sites: domain + 'locations/sites/',
      get_buildings: domain + 'locations/buildings/',
      get_floors: domain + 'locations/floors/',
      get_spaces: domain + 'locations/spaces/'
    };
    var authentication_user = {
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
    .then(function (response) {
      console.log(response);
      return response;
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
            
          </Col>
          <Col sm={12} md={6}>
            
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            
          </Col>
          <Col sm={6}>
            
          </Col>
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
