import React from 'react';
import Button from '@atoms/Button/Button';
import InputField from '@atoms/InputField';
import ProjectLayout from '@templates/ProjectLayout/ProjectLayout';


const ClimbingTheLeaderboard: React.FC = () => {

    const [output, setOutput] = React.useState<string>("");
    const [leaderboardScores, setLeaderboardScores] = React.useState<number[]>([]);
    const [playerScores, setPlayerScores] = React.useState<number[]>([]);

    function handleClick() {
        let playerRanks: number[] = [];
        console.log(leaderboardScores)
        console.log(playerScores)

        playerScores.forEach((score) => {
            let leaderboard = [...new Set([...leaderboardScores, score])].sort((first, second) => first > second ? -1 : 1);
            
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
                        isInputNumber={true}
                        isInputArray={true}
                    />,
                    <InputField
                        placeHolder="Player scores..."
                        setInput={setPlayerScores}
                        isInputNumber={true}
                        isInputArray={true}
                    />
                ]
            }
            output={output}
            button={
                <>
                    <Button
                        text="Calculate"
                        onClick={() => {
                            (leaderboardScores.length > 0 && playerScores.length > 0) &&
                            handleClick();
                        }}
                    />
                </>
            }
        />
    );
};

export default ClimbingTheLeaderboard;
