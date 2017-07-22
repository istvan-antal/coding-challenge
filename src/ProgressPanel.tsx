import * as React from 'react';

interface ProgressPanelProps {
    nextRound: () => void;
    isSuccessful: boolean;
    isChallangeComplete: boolean;
}

export const ProgressPanel = ({ isSuccessful, isChallangeComplete, nextRound }: ProgressPanelProps) => {
    if (isChallangeComplete) {
        return (
            <div>
                Challange complete!
            </div>
        );
    }
    if (isSuccessful) {
        return (
            <div>
                <button onClick={nextRound}>Next round</button>
            </div>
        );
    }

    return <div />;
};