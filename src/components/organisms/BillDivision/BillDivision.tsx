import React from 'react';
import Button from '@atoms/Button/Button';
import InputField from '@atoms/InputField';
import ProjectLayout from '@templates/ProjectLayout/ProjectLayout';


const BillDivision: React.FC = () => {

    const [output, setOutput] = React.useState<string>("");
    const [consumedItems, setConsumedItems] = React.useState<number[]>([]);
    const [notConsumed, setNotConsumed] = React.useState<number>(0);
    const [contributedMoney, setContributedMoney] = React.useState<number>(0);

    function handleClick() {
        let total = 0;
        consumedItems.forEach((item, index) => {
            console.log(index);
            if (index !== notConsumed) {
                total += item;
            }
        });
        
        if ((total/2) === contributedMoney) {
            setOutput("Bon Appetit")
        } else {
            setOutput((contributedMoney - (total/2)).toString())
        }
    };

    return (
        <ProjectLayout
            title="Bill Division"
            descriptionLink="bon-appetit"
            input={
                [
                    <InputField
                        placeHolder="Array of items..."
                        setInput={setConsumedItems}
                        isInputNumber={true}
                        isInputArray={true}
                    />,
                    <InputField
                        placeHolder="Unconsumed item..."
                        setInput={setNotConsumed}
                        isInputNumber={true}
                        isInputArray={false}
                    />,
                    <InputField
                        placeHolder="Money contribution..."
                        setInput={setContributedMoney}
                        isInputNumber={true}
                        isInputArray={false}
                    />
                ]
            }
            output={output}
            button={
                <>
                    <Button
                        text="Execute"
                        onClick={() => {
                            handleClick();
                        }}
                    />
                </>
            }
        />
    );
};

export default BillDivision;
