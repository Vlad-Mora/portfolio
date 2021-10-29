import React from 'react';
import Button from '@atoms/Button/Button';
import InputField from '@atoms/InputField';
import ProjectLayout from '@templates/ProjectLayout/ProjectLayout';
import { inputToArray } from '@helpers/inputToArray';


const ClimbingTheLeaderboard: React.FC = () => {

    const [output, setOutput] = React.useState<string>("");
    const [leaderboardScores, setLeaderboardScores] = React.useState<string>("");
    const [playerScores, setPlayerScores] = React.useState<string>("");

    function handleClick() {
        let leaderboardScoresInt = inputToArray(leaderboardScores, true);
        let playerScoresInt = inputToArray(playerScores, true);
        let playerRanks: number[] = [];

        playerScoresInt.forEach((score) => {
            let leaderboard = [...new Set([...leaderboardScoresInt, score])].sort((first, second) => first > second ? -1 : 1);
            
            const leaderboardPosition = leaderboard.indexOf(score) + 1;
            playerRanks.push(leaderboardPosition);
        })

        setOutput(playerRanks.join(", "));
    };

    return (
        <ProjectLayout
            title="Climbing The Leaderboard"
            descriptionLink="climbing-the-leaderboard"
            input={
                [
                    <InputField
                        placeHolder="Leaderboard scores..."
                        setInput={setLeaderboardScores}
                        isInputNumber={false}
                    />,
                    <InputField
                        placeHolder="Player scores..."
                        setInput={setPlayerScores}
                        isInputNumber={false}
                    />
                ]
            }
            output={output}
            button={
                <>
                    <Button
                        text="Calculate"
                        onClick={() => {
                            (leaderboardScores !== "" && playerScores !== "") &&
                            handleClick();
                        }}
                    />
                </>
            }
        />
    );
};

export default ClimbingTheLeaderboard;
