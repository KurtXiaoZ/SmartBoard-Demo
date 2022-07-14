import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import './index.css';

export const Editor = (props) => {
    const {
        code,
        placeHolder,
        onCodeChange,
        isValid,
    } = props;
    return <div className='code-editor'>
        <CodeEditor
            value={code}
            language="js"
            placeholder={placeHolder}
            onChange={onCodeChange}
            padding={13}
            style={{
                fontSize: 12,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                borderRadius: '5px',
                border: isValid ? '2.5px solid transparent': '2.5px solid #ff4d4d',
            }}
        />
    </div>;
}