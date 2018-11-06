import React from 'react'
import StandardPage from '../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import I18N from '@/I18N'
import { Link } from 'react-router-dom'
import './style.scss'
import MediaQuery from 'react-responsive'
import { Col, Row, Card, Button, Breadcrumb, Icon, Table, Input } from 'antd'
import {MAX_WIDTH_MOBILE} from "../../../config/constant"

export default class extends StandardPage {
    async componentDidMount() {
        this.refetch()
    }

    componentWillUnmount() {
    }

    refetch() {
        this.props.listUsers({
            search: this.state.search || ''
        })
    }

    ord_states() {
        return {
            search: ''
        }
    }

    ord_renderContent () {
        return (
            <div className="p_Developer">
                <div className="ebp-header-divider" />
                <div className="p_admin_index">
                    <div className="d_box">
                        <div className="p_admin_content">
                            {this.buildInfoPanel()}
                            {this.buildNavi()}
                            {this.buildMemberSearch()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    buildInfoPanel() {
        return (
            <div className="info-panel panel">
                <div className="info-panel-content panel-content">
                    <div className="info-panel-left pull-left">
                        <h3 className="with-gizmo">
                            {I18N.get('0002')}
                        </h3>
                        <div className="info-panel-link">
                            <a href="https://t.me/elastosgroup" target="_blank">
                                Telegram
                            </a>
                        </div>
                        <div className="info-panel-link">
                            <a href="https://twitter.com/cyber__republic" target="_blank">
                                Twitter
                            </a>
                        </div>
                        <div className="info-panel-link">
                            <a href="https://github.com/cyber-republic" target="_blank">
                                GitHub
                            </a>
                        </div>
                        <div className="info-panel-link">
                            <a href="https://discord.gg/bKcPf8R" target="_blank">
                                Discord
                            </a>
                        </div>
                    </div>
                    <div className="pull-right">
                        <img src="/assets/images/community-world.png"/>
                    </div>
                    <div className="clearfix"/>
                </div>
            </div>
        )
    }

    buildNavi() {
        const buildNaviItem = (title, description, link) => {
            return (
                <Row className="navi-panel-item"
                    onClick={() => this.props.history.push(link)}>
                    <Col span={4} className="navi-panel-item-title">
                        {title}
                    </Col>
                    <Col span={16} className="navi-panel-item-description">
                        {description}
                    </Col>
                    <Col span={4} className="navi-panel-item-arrow">
                        <img src="/assets/images/arrow-right.png"/>
                    </Col>
                </Row>
            )
        }

        return (
            <div className="navi-panel panel">
                <div className="navi-panel-content panel-content">
                    {buildNaviItem('Learn', 'Tutorials, Resources and more', '/developer/learn')}
                    {buildNaviItem('Teams', 'Connect, Form Teams and work on projects', '/developer/search')}
                    {buildNaviItem('Projects', 'Overview of Cyber Republic Projects', '/developer/search?type=PROJECT')}
                    {buildNaviItem('Tasks', 'Overview of Cyber Republic Tasks', '/developer/search?type=TASK')}
                </div>
            </div>
        )
    }

    getUserNameWithFallback(user) {
        if (_.isEmpty(user.profile.firstName) && _.isEmpty(user.profile.lastName)) {
            return user.username
        }

        return _.trim([user.profile.firstName, user.profile.lastName].join(' '))
    }

    getUserCircles(user) {
        if (_.isEmpty(user.circles)) {
            return ''
        }

        return _.map(user.circles, (circle) => circle.name).join(' ')
    }

    buildMemberSearch() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (name, user) => this.getUserNameWithFallback(user)
            },
            {
                title: 'Username',
                dataIndex: 'username',
            },
            {
                title: 'Circles',
                dataIndex: 'circles',
                render: (circles, user) => this.getUserCircles(user)
            }
        ]

        const searchChangedHandler = (e) => {
            const search = e.target.value
            this.setState({ search }, _.debounce(this.refetch.bind(this), 333))
        }

        return (
            <div className="member-panel panel">
                <div className="member-panel-content panel-content">
                    <h3 className="with-gizmo">
                        Member Search
                    </h3>
                    <Row className="member-panel-search">
                        <Col span={9}>
                            <Input placeholder={I18N.get('developer.breadcrumb.search')}
                                onChange={searchChangedHandler.bind(this)}/>
                        </Col>
                    </Row>
                    <Table
                        className="no-borders"
                        dataSource={this.props.users}
                        loading={this.props.loading}
                        columns={columns}
                        bordered={false}
                        rowKey="_id"
                        pagination={{showTotal: total => `Total ${total} users`, pageSize: 5}}>
                    </Table>
                </div>
            </div>
        )
    }
}
