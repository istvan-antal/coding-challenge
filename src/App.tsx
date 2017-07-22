import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ProgressPanel } from './ProgressPanel';
import { Challenge } from './Challenge';
import ProgramRunner from './ProgramRunner';
const challenge: Challenge = require('./challenges/addTwoNumbers.json');

import './App.css';

interface AppState {
  currentRound: number;
  code: string;
  consoleMessages: string;
  isSuccessful: boolean;
  isChallangeComplete: boolean;
}

/* tslint:disable:no-any */
class App extends React.Component<{}, AppState> {
    private runner: ProgramRunner;
    private nextRound: () => void;
    constructor() {
        super();
        this.runner = new ProgramRunner();
        this.runner.setCode(challenge.rounds[0]);
        this.state = {
          currentRound: 0,
          code: challenge.rounds[0].initialCode,
          consoleMessages: '',
          isSuccessful: false,
          isChallangeComplete: false,
        };
        this.nextRound = () => {
            if (!this.runner.isSuccessful()) {
                return;
            }

            if (this.state.currentRound + 1 >= challenge.rounds.length) {
                this.setState({
                isChallangeComplete: true,
                });
                // tslint:disable-next-line:no-console
                console.info('isChallangeComplete=true');
                return;
            }
            // tslint:disable-next-line:no-console
            console.info('nextRound');
            const currentRound = this.state.currentRound + 1;
            this.runner.setCode(challenge.rounds[currentRound]);

            this.setState({
                currentRound,
                code: challenge.rounds[currentRound].initialCode,
                consoleMessages: '',
            });
        };
    }
    editorDidMount(editor: any, monaco: any) {
        // console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(code: string) {
        this.runner.run(code);
        this.setState({
          isSuccessful: this.runner.isSuccessful(),
          code,
          consoleMessages: this.runner.getConsoleMessages(),
        });
    }
    render() {
        const onChange = this.onChange.bind(this);
        return (
            <div className="App">
                <div className="panel">
                    <MonacoEditor
                        width="800"
                        height="600"
                        language="javascript"
                        value={this.state.code}
                        editorDidMount={this.editorDidMount}
                        onChange={onChange}
                    />
                </div>
                <div className="panel">
                  {this.state.consoleMessages}
                  <ProgressPanel
                    nextRound={this.nextRound}
                    isSuccessful={this.state.isSuccessful}
                    isChallangeComplete={this.state.isChallangeComplete}
                  />
                </div>
            </div>
        );
    }
}

export default App;
