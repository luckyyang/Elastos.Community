import React from 'react'
import StandardPage from '../../StandardPage'
import './style.scss'

import { Col, Row, Breadcrumb, Icon } from 'antd'
import ListUsers from './ListUsers/Component'
import Navigator from '../shared/Navigator/Component'

export default class extends StandardPage {
    ord_renderContent () {
        return (
            <div className="p_admin_index ebp-wrap ebp-wrap--admin">
                <div className="d_box">
                    <div className="p_admin_breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Admin</Breadcrumb.Item>
                            <Breadcrumb.Item>Community</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="p_admin_content">
                        <Row>
                            <Col span={18} className="admin-left-column wrap-box-user">
                                <div>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            Global
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            Country
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            Region
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <ListUsers/>
                            </Col>
                            <Col span={6} className="admin-right-column wrap-box-navigator">
                                <Navigator selectedItem={'community'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

    ord_checkLogin (isLogin) {
        if (isLogin) {
            this.props.history.replace('/home')
        }
    }
}