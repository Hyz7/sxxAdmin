import React,{Component} from 'react'
import { Upload, Icon, message } from 'antd'

class UploadImg extends Component {
    state = {
        imageUrl:''
    };
    /*compression=(src,picname)=>{
// 创建一个 Image 对象
        var image = new Image();
        // 绑定 load 事件处理器，加载完成后执行
        image.onload = function() {
            // 获取 canvas DOM 对象
            var canvas = document.createElement("canvas");
            // 如果高度超标
            if (image.height > MAX_HEIGHT && image.height >= image.width) {
                // 宽度等比例缩放 *=
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            //考录到用户上传的有可能是横屏图片同样过滤下宽度的图片。
            if (image.width > MAX_HEIGHT && image.width > image.height) {
                // 宽度等比例缩放 *=
                image.height *= MAX_HEIGHT / image.width;
                image.width = MAX_HEIGHT;
            }

            // 获取 canvas的 2d 画布对象,
            var ctx = canvas.getContext("2d");
            // canvas清屏，并设置为上面宽高
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 重置canvas宽高
            canvas.width = image.width;
            canvas.height = image.height;
            // 将图像绘制到canvas上
            ctx.drawImage(image, 0, 0, image.width, image.height);
            // !!! 注意，image 没有加入到 dom之中
//        document.getElementById('img').src = canvas.toDataURL("image/png");
            var blob = canvas.toDataURL("image/jpeg");
            //将转换结果放在要上传的图片数组里
            imgarr.push({"pic":blob,"pic_name":picname});
        };
        image.src = src;
    }*/
    //图片上传
    getBase64=(img, callback)=> {
        const reader = new FileReader();
        /*(function(x){
            reader.onload = function (e) {
                this.compression(this.result,x);
            }

        })(img.name)*/

        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload=(file)=> {
        const isJPG = file.type === 'image/jpeg'||'image/png';
        if (!isJPG) {
            message.error('You can upload JPG or PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    handleChange = (info) => {
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl },()=>{this.props.getImgBase64(imageUrl)}));
        }
    }

    render() {
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                className="avatar-uploader"
                name="avatar"
                showUploadList={false}
                action='http://192.168.0.101/dynamic/insertImg'
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {
                    imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                }
            </Upload>
        );
    }
}

export default UploadImg