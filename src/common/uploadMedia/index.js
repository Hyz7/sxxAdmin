import React, {Component} from 'react';
import { Upload, Icon, Button } from 'antd';


class uploadMedia extends Component {

    render() {
        const props = {
            action: 'http://52.83.225.97:9090/media/upload/uploadMediaData?courseId='+this.state.courseId+'&&teachplanId='+this.state.teachplanId,
            onChange({ file, fileList }) {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                }
            },
            defaultFileList: [],
        };
        return (
            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> Upload
                </Button>
            </Upload>
        );
    }
}

export default uploadMedia;

