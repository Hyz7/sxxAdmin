import React, {Component} from 'react';
import {Select} from "antd";
import {connect} from 'react-redux'
import * as actionCreators from "../../store/course/actionCreators";
const Option = Select.Option;
class SelectInput extends Component {
    componentDidMount() {
        this.props.getTeachPlan(this.props.courseId)
    }

    handleChange=(value)=> {
        this.setState({
            parentId:value?value.key:''
        },()=>{
            this.props.selectId(this.state.parentId)
        })
    }
    render() {
        return (
            <Select
                style={{ width: '100%'}}
                placeholder="Please select"
                onChange={this.handleChange}
                allowClear={true}
                labelInValue={true}
            >
                {
                    this.props.planList?this.props.planList.map((item)=>{
                        return <Option key={item.id}>{item.pname}</Option>
                    }):null
                }
            </Select>
        );
    }
}
export default connect((state)=>({
    planList:state.course.planList
}),(dispatch)=>({
    getTeachPlan(id){
        dispatch(actionCreators.getTeachPlan(id))
    }
}))(SelectInput);
