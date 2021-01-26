import React from 'react';

import MonacoEditor from '@monaco-editor/react';
import Settings from './Settings';

import { useStore } from 'store';
import examples from 'config/examples';
import config from 'config';
import { useRef, useState } from "react";

import useStyles from './useStyles';
import { noop } from 'utils';


const Editor = _ => {
  const classes = useStyles();
  const { state: { editor: { selectedLanguageId, options }, monacoTheme } } = useStore();

  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef()


  const editorRef = useRef();

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
    // Now you can use the instance of monaco editor
    // in this component whenever you want
  }

  function listenEditorChanges() {
    editorRef.current.onDidChangeModelContent(ev => {
      console.log(editorRef.current.getValue());
    });
  }



  function handleShowValue() {
    alert(valueGetter.current);
  }

  
/*   const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    // setGetEditorValue(_ => valueGetter);
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

function handleShowValue() {
  alert(valueGetter.current());
} */
  return <div className={classes.root}>
    <div className={classes.mnEditor}>
    <MonacoEditor
      theme={monacoTheme}
      width="100%"
      height="100%"
      value={examples[selectedLanguageId] || ''}
      language={config.supportedLanguages.find(({ id }) => id === selectedLanguageId).name}
      options={options}
      editorDidMount={handleEditorDidMount, handleShowValue}
    />
    </div>
    <div className={classes.sett}>
    <Settings/>
    </div>

  </div>;
}

export default Editor;
