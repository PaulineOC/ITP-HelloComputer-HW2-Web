window.onload = init;

let currentQuestion = 0;

let sessionAnswers = {
	'model': null,
	'hair-length': null,
	'name': null,
	'gender': null,
	'age': null, 
	'emotion': null,
	'ethnicity': null,
	"eye-color": null,
	"hair-color": null,
	"confidence": null,
};

//Speaker
const speaker = window.speechSynthesis;

//Listener
const SpeechRecognition = webkitSpeechRecognition; //eslint-disable-line
const listener = new SpeechRecognition();
listener.lang = "en-US";


const buttonForSecondQuestion = document.getElementById("questionbutton2");
buttonForSecondQuestion.onclick = () => {
	const questionVerbal = QUESTIONS[`${currentQuestion}`]["question-verbal"];
	const questionText = QUESTIONS[`${currentQuestion}`]["question-text"];

	const handleAnswer = (input) => {
		const answer = input.toLowerCase();

		console.log('here is q2 answer: ', answer);

		if(answer.includes(ETHNICITY.WHITE)){
			saveFinalAnswer("ethnicity", ETHNICITY.WHITE);
		}
		else if(answer.includes(ETHNICITY.LATINO)){
			saveFinalAnswer("ethnicity", ETHNICITY.LATINO);
		}
		else if(answer.includes(ETHNICITY.ASIAN)){
			saveFinalAnswer("ethnicity", ETHNICITY.ASIAN);
		}
		else if(answer.includes(ETHNICITY.BLACK)){
			saveFinalAnswer("ethnicity", ETHNICITY.BLACK);
		}
		else if(answer.includes(ETHNICITY.OMIT)){
			saveFinalAnswer("ethnicity", null);
		}
		else{
			//Guessing or unintelligble answer
			// take out omit and guess
			const keys = Object.keys(ETHNICITY).slice(0, 4);
			const randomInd = Math.floor(Math.random() * keys.length);
			const randomItem = keys[randomInd];
			saveFinalAnswer("ethnicity", ETHNICITY[`${randomItem}`]);
		}	
		return (`<p class="response"> You said: "${input}"</p>
		`);
	};

	askQuestionReceiveAnswer(questionVerbal, questionText, handleAnswer);
	buttonForSecondQuestion.classList.toggle("hidden");
};

const buttonForThirdQuestion = document.getElementById("questionbutton3");
buttonForThirdQuestion.onclick = () => {
	const questionVerbal = QUESTIONS[`${currentQuestion}`]["question-verbal"];
	const questionText = QUESTIONS[`${currentQuestion}`]["question-text"];

	const handleAnswer = (input) => {
		const answer = input.toLowerCase();

		console.log('here is q3 answer: ', answer);

		if(answer.includes(SEASONS.WINTER)){
			saveFinalAnswer("eye-color", EYECOLOR.GRAY);
			saveFinalAnswer("hair-color", HAIRCOLOR.BLACK);
		}
		else if(answer.includes(SEASONS.SPRING)){
			saveFinalAnswer("eye-color", EYECOLOR.GREEN);
			saveFinalAnswer("hair-color", HAIRCOLOR.BROWN);
		}
		else if(answer.includes(SEASONS.SUMMER)){
			saveFinalAnswer("eye-color", EYECOLOR.BLUE);
			saveFinalAnswer("hair-color", HAIRCOLOR.BLOND);
		}
		else if(answer.includes(SEASONS.FALL)){
			saveFinalAnswer("eye-color", EYECOLOR.BROWN);
			saveFinalAnswer("hair-color", HAIRCOLOR.RED);
		}
		else{
			//Unintelligble answer 
			const seasonKey = Object.keys(SEASONS);

			const hairKeys = Object.keys(HAIRCOLOR).slice().filter((ite)=>{
				return ite.toLowerCase() !== HAIRCOLOR.GRAY
			});
			const eyeKeys = Object.keys(EYECOLOR);

			const randomInd = Math.floor(Math.random() * seasonKey.length);

			const randomEye = eyeKeys[randomInd];
			const randomHair = hairKeys[randomInd];

			saveFinalAnswer("hair-color", HAIRCOLOR[`${randomHair}`]);
			saveFinalAnswer("eye-color", EYECOLOR[`${randomEye}`]);

		}
		return (`<p class="response"> You said: "${input}"</p>
		`);
	};
	askQuestionReceiveAnswer(questionVerbal, questionText, handleAnswer);
	buttonForThirdQuestion.classList.toggle("hidden");
};


const buttonForLastQuestion = document.getElementById("questionbutton4");
buttonForLastQuestion.onclick = () => {
	const questionVerbal = QUESTIONS[`${currentQuestion}`]["question-verbal"];
	const questionText = QUESTIONS[`${currentQuestion}`]["question-text"];

	const handleAnswer = (input) => {
		const answer = input.toLowerCase();

		console.log('here is q4 answer: ', answer);

		if(answer.includes(AGE.INFANT)){
			saveFinalAnswer("age", AGE.INFANT);
		}
		else if(answer.includes(AGE.CHILD)){
			saveFinalAnswer("age", AGE.CHILD);
		}
		else if(answer.includes(AGE["YOUNG-ADULT"])){
			saveFinalAnswer("age", AGE["YOUNG-ADULT"]);
		}
		else if(answer.includes(AGE.ADULT)){
			saveFinalAnswer("age", AGE.ADULT);
		}
		else if(answer.includes(AGE.ELDERLY)){
			saveFinalAnswer("age", AGE.ELDERLY);
		}
		else if(answer.includes(AGE.OMIT)){
			saveFinalAnswer("age", null);
		}
		else{
			//Guessing or unintelligble answer
			// take out omit and guess
			const keys = Object.keys(AGE).slice(0, 5);
			console.log(keys);
			const randomInd = Math.floor(Math.random() * keys.length);
			const randomItem = keys[randomInd];
			saveFinalAnswer("age", AGE[`${randomItem}`]);
		}	
		return (`<p class="response"> You said: "${input}"</p>
		`);
	};

	askQuestionReceiveAnswer(questionVerbal, questionText, handleAnswer);
	buttonForLastQuestion.classList.toggle("hidden");

};

//Main functions
const askQuestionReceiveAnswer = (question, questionText, handleAnswer) => {

	//Reset the answer:
	const responseEle = document.getElementById("response");
	responseEle.innerHTML = ``;

	//Computer Asks Question
	let questionToAsk = new SpeechSynthesisUtterance(question);
	questionToAsk.lang = "en-US";
	speaker.speak(questionToAsk);
	const questionEle = document.getElementById("question");
	questionEle.innerHTML = questionText;

	questionToAsk.onend = () => {

		//Listener for Answer
		listener.start();
		listener.onresult = () => {
			const answer = event.results[0][0].transcript;

			console.log(currentQuestion);

			//Show New Response
			responseEle.innerHTML = handleAnswer(answer);

			currentQuestion++;


			console.log('right before callback');

			//Show button for next question
			if(currentQuestion<=3  && currentQuestion>0){
				document.getElementById(`questionbutton${currentQuestion+1}`).classList.toggle("hidden");
			}
			console.log('curr question: ', currentQuestion);
			if(currentQuestion===4){
				endQuiz();
			}
		}
	};
};

const saveFinalAnswer = (field, answer) => {
	sessionAnswers[field] = answer;
};

//Specific unasked parameters
const handleModelParam = () => {
	const version = Math.floor(Math.random() * 3)+1;
	saveFinalAnswer("model", version);
};

const handleSeasonParam = () => {
	const currMonth = dayjs().month();

	// Winter: 12, 0, 1 (December, January, February)
	if(currMonth === 11 || (currMonth>=0 && currMonth < 2)){
		console.log('winter');
		saveFinalAnswer("hair-length", HAIRLENGTH.LONG);
	}
	// Summer: 5 6 7 (June, July, Aug)
	else if(currMonth >= 5 && currMonth < 8){
		console.log('summer');
		saveFinalAnswer("hair-length", HAIRLENGTH.SHORT);
	}
	// Spring/Fall
	else{
		console.log('spring/fall');
		saveFinalAnswer("hair-length", HAIRLENGTH.MEDIUM);
	}
};

const startQuiz = () => {
	startButton.disabled = true;

	handleModelParam();
	handleSeasonParam();

	//Q1: What is your name? 
	const questionVerbal = QUESTIONS[`${currentQuestion}`]["question-verbal"];
	const questionText = QUESTIONS[`${currentQuestion}`]["question-text"];
	const answerText = QUESTIONS[`${currentQuestion}`]["answer-text"];

	const handleAnswer = (name) => {

		// make a fetch request here
		getGender(name.toLowerCase(), () => {
			saveFinalAnswer("name", name);
			document.getElementById(`questionbutton${currentQuestion+1}`).classList.remove("hidden");
		});
		return `Hello, ${name}`;
	};

	askQuestionReceiveAnswer(questionVerbal, questionText, handleAnswer);
};

const endQuiz = () => {
	//Add Loading
	document.getElementById("loading").classList.toggle("hidden");
	document.getElementById("question").classList.add("hidden");
	document.getElementById("response").classList.add("hidden");

	console.log("answers to submit:");
	console.log(sessionAnswers);
	getPicture();
}
