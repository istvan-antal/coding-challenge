import { ChallengeRound } from './Challenge';

/* tslint:disable:no-any */
const assert = (result: boolean, message: string) => {
    if (!result) {
        throw new Error(message);
    }
};

const expect = (subject: any) => ({
    toBe: (value: any) => assert(subject === value, `Expected '${subject}' to be '${value}'`),
});

export default class ProgramRunner {
    private consoleMessages: string;
    private test: (result: any, expect: (subject: any) => any) => void;
    private isRunSuccessful = false;
    private round: ChallengeRound;

    setCode(round: ChallengeRound) {
        this.round = round;
        this.test = new Function('result, expect', this.round.test) as (result: any) => void;
    }

    getConsoleMessages(): string {
        return this.consoleMessages;
    }
    run(code: string) {
        this.consoleMessages = '';

        try {
            const program = new Function('console', code);

            const result = program({
                log: (message: string) => { this.consoleMessages += `${message}\n`; },
                warn: (message: string) => { this.consoleMessages += `${message}\n`; },
                error: (message: string) => { this.consoleMessages += `${message}\n`; },
                debug: (message: string) => { this.consoleMessages += `${message}\n`; },
                info: (message: string) => { this.consoleMessages += `${message}\n`; },
            });

            if (!result) {
                this.consoleMessages += 'Your code should return the required implementation.\n';
            } else {
                this.test(result, expect);
                this.isRunSuccessful = true;
            }
        } catch (e) {
            this.isRunSuccessful = false;
            this.consoleMessages += `${e}\n`;
        }
    }
    isSuccessful() {
        return this.isRunSuccessful;
    }
}