import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

/* tslint:disable:no-any */
class App extends React.Component<{}, { code: string; consoleMessages: string }> {
    constructor() {
        super();

        this.state = { code: 'console.log("hello world");', consoleMessages: '' };
    }
    editorDidMount(editor: any, monaco: any) {
        // console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(code: string) {
        let consoleMessages = '';

        try {
            const program = new Function('console', code);

            program({
                log: (message: string) => { consoleMessages += `${message}\n`; },
                warn: (message: string) => { consoleMessages += `${message}\n`; },
                error: (message: string) => { consoleMessages += `${message}\n`; },
                debug: (message: string) => { consoleMessages += `${message}\n`; },
                info: (message: string) => { consoleMessages += `${message}\n`; },
            });
        } catch (e) {
            consoleMessages += `${e}\n`;
        }

        this.setState({ code, consoleMessages });
    }
    render() {
        const onChange = this.onChange.bind(this);
        return (
            <div>
                <MonacoEditor
                    width="800"
                    height="600"
                    language="javascript"
                    value={this.state.code}
                    editorDidMount={this.editorDidMount}
                    onChange={onChange}
                />
                {this.state.consoleMessages}
            </div>
        );
    }
}

export default App;
