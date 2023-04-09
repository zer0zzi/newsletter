import React from 'react';
import styles from '../App.css';
//import styles from './styles.module.scss';
import classNames from 'classnames/bind';

import ReactSummernote from 'react-summernote';
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";

const cx = classNames.bind(styles);

class summernoteEditor extends React.Component {
    onChange = content => {
        console.log("onChange", content);
    };

    onImageUpload = (images, insertImage) => {
        for (let i=0; i<images.length; i++){
            const reader = new FileReader();

            reader.onloadend = () => {
                insertImage(reader.result);
            };
            reader.readAsDataURL(images[i]);
        }
    };

    render() {
        return (
            <div classNames={cx("container")}>
                <ReactSummernote
                    value="내용을 입력해주세요."
                    options={{
                        lang: "ko-KR",
                        height: 380,
                        dialogsInBody: true,
                        toolbar: [
                            ["style", ["style"]],
                            ["font", ["bold", "underline", "clear"]],
                            ["fontname", ["fontname"]],
                            ["para", ["ul", "ol", "paragraph"]],
                            ["table", ["table"]],
                            ["insert", ["link", "picture", "video"]],
                            ["view", ["fullscreen", "codeview"]]
                        ]
                    }}
                    onChange={this.onChange}
                    onImageUpload={this.onImageUpload}
                />
            </div>
        );
    }
}

export default summernoteEditor;