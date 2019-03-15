import React, {Component} from 'react';
import { Upload, Icon, Button } from 'antd';


const props = {
    action: 'http://192.168.0.102:31400/media/upload/uploadMediaData',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [],
};
class uploadMedia extends Component {
    render() {
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

