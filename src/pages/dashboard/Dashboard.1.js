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
              title={
                <div>
                  <div className="pull-right mt-n-xs">
                    <input
                      type="search"
                      placeholder="Search..."
                      className="form-control input-sm"
                    />
                  </div>
                  <h5 className="mt-0 mb-3">
                    <i className="fa fa-user mr-xs opacity-70" />{' '}
                    Onboarding
                  </h5>
                </div>
              }
            >
              <Table responsive borderless className={cx('mb-0', s.usersTable)}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Alice</td>
                    <td>alice@email.com</td>
                    <td>
                      <span className="py-0 px-1 bg-success rounded text-white">active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Bob</td>
                    <td>bob@email.com</td>
                    <td>
                      <span className="py-0 px-1 bg-warning rounded text-white">delayed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Duck</td>
                    <td>duck@email.com</td>
                    <td>
                      <span className="py-0 px-1 bg-success rounded text-white">active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Shepherd</td>
                    <td>shepherd@email.com</td>
                    <td>
                      <span className="py-0 px-1 bg-danger rounded text-white">removed</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Widget title="Happiness">
              <Alert
                className="alert-sm"
                color="warning"
              >
                <span className="fw-semi-bold">Warning:</span> Best check yo
                self, you&#39;re not looking too good.
              </Alert>
              <Alert
                className="alert-sm"
                color="success"
              >
                <span className="fw-semi-bold">Success:</span> You successfully
                read this important alert message.
              </Alert>
              <Alert
                className="alert-sm"
                color="info"
              >
                <span className="fw-semi-bold">Info:</span> This alert needs
                your attention, but it&#39;s not super important.
              </Alert>
              <Alert
                className="alert-sm clearfix"
                color="danger"
              >
                <span className="fw-semi-bold">Danger:</span> Change this and
                that and try again.
                <span className="pull-right mr-sm">
                  <Button color="danger" size="sm">
                    Take this action
                  </Button>
                  <span className="px-2"> or </span>
                  <Button color="default" size="sm">Cancel</Button>
                </span>
              </Alert>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <div>
                  <div className="pull-right mt-n-xs">
                    {/* eslint-disable */}
                    <a href="#" className="td-underline fs-sm">
                      Options
                    </a>
                    {/* eslint-enable */}
                  </div>
                  <h5 className="mt-0 mb-0">
                    Effectiveness{' '}
                    <Badge color="success" className="ml-xs">
                      5
                    </Badge>
                  </h5>
                  <p className="fs-sm mb-0 text-muted">
                    posts, that have been published recently
                  </p>
                </div>
              }
            >
              <table className="table table-sm table-no-border mb-0">
                <tbody>
                {this.props.posts &&
                this.props.posts.map(post => (
                  <tr key={post.id}>
                    <td>{new Date(post.updatedAt).toLocaleString()}</td>
                    <td>
                      <Link to="/app/posts">{post.title}</Link>
                    </td>
                  </tr>
                ))}
                {this.props.posts &&
                !this.props.posts.length && (
                  <tr>
                    <td colSpan="100">No posts yet</td>
                  </tr>
                )}
                {this.props.isFetching && (
                  <tr>
                    <td colSpan="100">Loading...</td>
                  </tr>
                )}
                </tbody>
              </table>
            </Widget>
          </Col>
          <Col sm={6}>
            <ListGroup>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-phone mr-xs text-secondary" />{' '}
                Incoming calls <Badge className="ml-xs" color="danger">3</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-bell-o mr-xs text-secondary" />{' '}
                Notifications <Badge className="ml-xs" color="warning">6</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-comment-o mr-xs text-secondary" />{' '}
                Messages <Badge className="ml-xs" color="success">18</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-eye mr-xs text-secondary" />{' '}
                Visits total
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-cloud mr-xs text-secondary" /> Inbox{' '}
              </Link>
            </ListGroup>
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
