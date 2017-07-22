export interface Challenge {
    rounds: ChallengeRound[];
}

export interface ChallengeRound {
    test: string;
    initialCode: string;
}