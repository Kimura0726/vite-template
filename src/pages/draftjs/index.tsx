import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  RichUtils,
  CompositeDecorator
} from 'draft-js';
import type { ContentBlock, ContentState } from 'draft-js';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

interface DraftDecoratorComponentProps {
  blockKey: any;
  contentState: ContentState;
  decoratedText: string;
  dir?: any;
  end: number;
  entityKey?: string;
  offsetKey: string;
  start: number;
  children?: any;
}

const TextEditor = (): JSX.Element => {
  const [isShowURLInput, setIsShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');

  const customStyleMap = {
    red: { color: 'red' },
    yellow: { color: 'yellow' },
    blue: { color: 'blue' },
    black: { color: 'black' }
  };

  const removeInlineStyles = (editorState: EditorState): EditorState => {
    const contentState = editorState.getCurrentContent();
    const contentWithoutStyles = Object.keys(customStyleMap).reduce(
      (newContentState: any, key: string) =>
        Modifier.removeInlineStyle(
          newContentState,
          editorState.getSelection(),
          key
        ),
      contentState
    );
    return EditorState.push(
      editorState,
      contentWithoutStyles,
      'change-inline-style'
    );
  };

  // スタイルを適用する
  const appyInlineStyle = (
    editorState: EditorState,
    style: string
  ): EditorState => {
    const neeContentState = Modifier.applyInlineStyle(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      style
    );
    return EditorState.push(
      editorState,
      neeContentState,
      'change-inline-style'
    );
  };

  const saveContent = (): void => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    localStorage.setItem('test', JSON.stringify(raw, null, 2));
    alert('メッセージを保存しました');
  };
  useEffect(() => {
    const raw = localStorage.getItem('test');
    if (raw != null) {
      const contentState = convertFromRaw(JSON.parse(raw));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  /** リンクの検索 */
  const findLinkEntities = (
    contentBlock: ContentBlock,
    callback: any,
    contentState: ContentState
  ): any => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback);
  };

  /** エディタ上でのリンク表示用 */
  const Link = (props: DraftDecoratorComponentProps): any => {
    const { url, isOpenNewTab } = props.contentState
      .getEntity(props.entityKey ?? '')
      .getData();
    return (
      <a
        href={url}
        className="link"
        target={isOpenNewTab != null ? '_blank' : '_self'}
        rel="noopener noreferrer"
        style={{ color: 'blue' }}
      >
        {props.children}
      </a>
    );
  };

  /** リンクの付与 */
  const handleLink = (): void => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue, isOpenNewTab: true }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey
    );
    onCloseLinkModal();
    setEditorState(nextEditorState);
  };

  /** リセット用関数 */
  const onCloseLinkModal = (): void => {
    setIsShowURLInput(false);
    setUrlValue('');
  };

  /** デコレータ */
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  return (
    <div>
      <div>
        <button
          onMouseDown={(e) => {
            const state = removeInlineStyles(editorState);
            setEditorState(appyInlineStyle(state, 'red'));
            e.preventDefault();
          }}
        >
          赤
        </button>
        <button
          onMouseDown={(e) => {
            const state = removeInlineStyles(editorState);
            setEditorState(appyInlineStyle(state, 'yellow'));
            e.preventDefault();
          }}
        >
          黄色
        </button>
        <button
          onMouseDown={(e) => {
            const state = removeInlineStyles(editorState);
            setEditorState(appyInlineStyle(state, 'blue'));
            e.preventDefault();
          }}
        >
          青
        </button>
        <button
          onMouseDown={(e) => {
            const state = removeInlineStyles(editorState);
            setEditorState(appyInlineStyle(state, 'black'));
            e.preventDefault();
          }}
        >
          黒
        </button>
      </div>
      <button
        className="button"
        onClick={() => {
          setIsShowURLInput((e) => !e);
        }}
      >
        url
      </button>
      {isShowURLInput && (
        <div className="urlContainer">
          <input
            className="urlInput"
            value={urlValue}
            onChange={(e) => {
              setUrlValue(e.target.value);
            }}
            type="text"
          />
          <button onClick={handleLink}>Confirm</button>
        </div>
      )}
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
        placeholder="ここから入力を行ってください。"
        localization={{
          locale: 'ja'
        }}
        customStyleMap={customStyleMap}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'textAlign', 'link'],
          inline: {
            options: ['bold', 'strikethrough']
          },
          blockType: {
            inDropdown: false,
            options: ['H2']
          },
          list: {
            options: ['unordered']
          },
          textAlign: {
            options: ['center']
          },
          link: {
            options: ['link']
          }
        }}
      />
      <div>
        <button onClick={saveContent}>保存</button>
      </div>
    </div>
  );
};

export default TextEditor;
