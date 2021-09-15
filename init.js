	
const init = () => {
	/*
		TO DO: 
	- Set date text
	- GET request to backend to see how many games are currently played
	- Set games remaining text 
	*/

	// Set Current Date:
	const currDate = dayjs().format('MMMM D, YYYY');
	const currDateEle = document.getElementById("current-date").textContent = `Current Date: ${currDate}`;

	let currGamesPlayed = 10;
	document.getElementById("games-remaining").textContent = `Sessions Remaining: ${MONTHLY_LIMIT-currGamesPlayed}`;
};

const startButton = document.getElementById("start-button");

// Handle password input
document.getElementById("submit-password").onclick = () => {
	const currPassword = document.getElementById("password-text").value;

	if(currPassword==="guesswho"){
		startButton.disabled=false;
	}
	//For testing: 
	//startButton.disabled = false;

};

startButton.onclick = () => {
	//Run main game function
	startQuiz();
};