#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import logUpdate from "log-update";
const sleep = (timer) => {
    return new Promise((res) => {
        setTimeout(res, timer);
    });
};
async function title() {
    var animationtitle = chalkAnimation.rainbow("Welcome to Guess Number Game!!!");
    await sleep(2000);
    animationtitle.stop();
}
const loader = () => {
    const frame = ["-", "|", "/", "\\"];
    let start = 0;
    const timer = setInterval(() => {
        const r = start++ % frame.length;
        logUpdate(frame[r]);
        if (start > 12) {
            logUpdate.done;
            clearInterval(timer);
        }
    }, 200);
};
async function startGame() {
    const guessNumber = Math.ceil(Math.random() * 4 + 1);
    const answer = await inquirer.prompt([
        {
            type: "number",
            name: "num",
            message: "Guess your number between 1 to 5: ",
        },
    ]);
    //   loader();
    if (answer.num == guessNumber) {
        console.log(chalk.yellow(`Wooho! You Guess ${answer.num} correctly!`));
    }
    else {
        console.log(chalk.red("Better Luck Next Time!"));
    }
    console.log(chalk.gray("--------------------------------"));
}
const looper = async () => {
    do {
        await startGame();
        var guessAgain = await inquirer.prompt([
            {
                type: "input",
                name: "string",
                message: "Do you want to play again ? ( Y or N ) ",
            },
        ]);
        console.log(chalk.gray("--------------------------------"));
    } while (guessAgain.string == "y" ||
        guessAgain.string == "Y" ||
        guessAgain.string == "yes" ||
        guessAgain.string == "YES");
};
await title();
looper();
