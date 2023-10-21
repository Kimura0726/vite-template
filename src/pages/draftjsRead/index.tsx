import { EditorState, convertFromRaw } from 'draft-js';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './styles.css';

const TextEditor = (): JSX.Element => {
  const customStyleMap = {
    red: { color: 'red' },
    yellow: { color: 'yellow' },
    blue: { color: 'blue' }
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const raw = localStorage.getItem('test');
    if (raw != null) {
      const contentState = convertFromRaw(JSON.parse(raw));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  return (
    <>
      <div>Draft.jsテスト</div>
      <Editor
        toolbarClassName="toolbarClassName_"
        editorClassName="editorClassName_"
        editorState={editorState}
        customStyleMap={customStyleMap}
        readOnly
      />
    </>
  );
};

export default TextEditor;
