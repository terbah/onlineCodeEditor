import React, { useState, useRef } from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';

import Editor from '@monaco-editor/react';
import monacoThemes from 'monaco-themes/themes/themelist';

import { useStore } from 'store';
import config from 'config';
import { noop } from 'utils';

import useStyles from './useStyles';
import ReactTerminal from 'react-terminal-component';
import { ReactThemes } from 'react-terminal-component';
import {
  EmulatorState, OutputFactory, CommandMapping,
  EnvironmentVariables, FileSystem, History,
  Outputs, defaultCommandMapping
} from 'javascript-terminal';
import { handleShowValue } from 'store/actions';


// import handleShowValue from 'sections/Editor/Editor';

const Settings = _ => {
  const defaultState = EmulatorState.createEmpty();
  const defaultOutputs = defaultState.getOutputs();

  const newOutputs = Outputs.addRecord(
    defaultOutputs, OutputFactory.makeTextOutput(
      `If needed, enter your inputs here
      before you run your code`
    )
  );
  const emulatorState = defaultState.setOutputs(newOutputs);




  const classes = useStyles();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const {
    state: { editor: { selectedLanguageId, options }, monacoTheme },
    actions: { editor: { setSelectedLanguageId, setOptions, setMonacoTheme }, showNotification },
    effects: { defineTheme },
  } = useStore();
  const [getEditorValue, setGetEditorValue] = useState(noop);
  const editorRef = useRef();

  function handleLanguageChange(ev) {
    setSelectedLanguageId(ev.target.value);
  }

  function handleThemeChange(ev) {
    const theme = ev.target.value;

    if (config.defaultThemes.includes(theme)) {
      setMonacoTheme(theme);
    } else {
      defineTheme(theme).then(_ => setMonacoTheme(theme));
    }
  }

  function handleEditorDidMount(valueGetter, editor) {
    setGetEditorValue(_ => valueGetter);
    setIsEditorReady(true);
    editorRef.current = editor;
  }

  function handleApply() {
    let oprions;
    try {
      oprions = JSON.parse(getEditorValue());
      setOptions(oprions);
    } catch {
      showNotification({ message: config.messages.invalidOptions, variant: 'error'})
    }
  }

  return (
    <div className={classes.root}>
      <div className = {classes.control}>

     <Button variant="outlined" 
      className={classes.languages} 
      color='green'
      onClick={handleShowValue}
      endIcon={<PlayArrowOutlinedIcon size="large"/>}>Run Code</Button> 
      {/* <Typography variant="h5">Settings</Typography> */}
      {/* <Divider /> */}
      <div className={classes.languages}>
        {/* <Typography className={classes.title} variant="h6">Languages</Typography> */}
        <TextField
          select
          variant="outlined"
          value={selectedLanguageId}
          onChange={handleLanguageChange}
          className="full-width"
          label="Language"
        >
          {config.supportedLanguages.map(language => (
            <MenuItem key={language.id} value={language.id}>
              {language.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className={classes.languages}>
        {/* <Typography className={classes.title} variant="h6">Themes</Typography> */}
        <TextField
          select
          variant="outlined"
          value={monacoTheme}
          onChange={handleThemeChange}
          className="full-width"
          label="Theme"
        >
          {config.defaultThemes.map(theme => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
          <MenuItem disabled><Divider /></MenuItem>
          {Object.entries(monacoThemes).map(([themeId, themeName]) => (
            <MenuItem key={themeId} value={themeId}>
              {themeName}
            </MenuItem>
          ))}
        </TextField>
      </div>
      </div>
      <div className={classes.console}>
         {/* <Typography className={classes.title} variant="h6">Options</Typography> */}
         <ReactTerminal 
          theme={
            {...ReactThemes.dye, height : "100%", fontSize : '0.8rem'}

          }
          emulatorState={emulatorState}
          
          ></ReactTerminal>
{/*          <Typography variant="subtitle2" gutterBottom>
          For full list of options with descriptions visit <Link
            href={config.urls.IEditorOptions}
            rel="noreferrer"
            target="_blank"
          >
            here
          </Link>
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Now you can change options below
        </Typography> */}
{/*         <div className={classes.editor}>
          <Editor
            theme={monacoTheme}
            language="json"
            height={100}
            // height={400}
            value={JSON.stringify(options, null, 2)}
            editorDidMount={handleEditorDidMount}
          />
        </div> */}
        {/* <Button variant="outlined" disabled={!isEditorReady} onClick={handleApply}>Apply</Button> */}
      </div>
    </div>
  );
};

export default Settings;
