import React, {Component} from 'react';
import {Button, Card} from "antd";

class Index extends Component {
    render() {
        return (
            <div>
                <Card title="学员动态">
                    <Button type="primary">新增</Button><br/><br/>
                    <Button type="dashed">编辑</Button>
                    <Button type="danger">删除</Button>

                </Card>
            </div>
        );
    }
}

export default Index;
