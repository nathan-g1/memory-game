# Shard Labs Memory Game

Requires [MongoDB](https://www.mongodb.com/try/download/community) & [NodeJs](https://nodejs.org/) to run the game.

## Clone and install dependencies

```sh
git clone https://github.com/Nathan-G1/memory-game.git
cd memory-game
bash makefile
```

### Envirnoment varialbles

Add the following to `be/.env`

```bash
PORT=5000
DATABASE_URI=mongodb://localhost:27017/
DB_NAME=memorygame
```

### Available Scripts

In each (`be` & `fe`) project directories, you can run:

```sh
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Answers to the questions

**How much time did you spend?**
> *Approximately, 11 hours*

**Where you able to get everything done?**
> *Yes*

**If you weren't able to get everything done - What is missing?**
> *NA*

**If you would have 5 days to finish the task - What would you improve/add?**
> *I would add game **complexity** level, `[hard, medimum, easy]`
> Sound effects on new high scores.
> Detailed commnents and documentation*
