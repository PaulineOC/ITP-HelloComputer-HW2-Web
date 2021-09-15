const MONTHLY_LIMIT = 50;

const NUM_QUESTIONS = 4;

const MODEL = Object.freeze({
	"1": "1",
	"2": "2",
	"3": "3",
});

const HAIRLENGTH = Object.freeze({
	"SHORT": "short",
	"MEDIUM": "medium",
	"LONG": "long"
});


const SEX = Object.freeze({
	"MALE": "male",
	"FEMALE": "female"
});

const AGE = Object.freeze({
	"INFANT": "infant",
	"CHILD": "child",
	"YOUNG-ADULT": "young-adult",
	"ELDERLY": "elderly",
});

const EMOTION = Object.freeze({
	"JOY": "joy",
	"NEUTRAL": "neutral",
	"SURPRISE": "surprise"
});

const ETHNICITY = Object.freeze({
	"WHITE": "white",
	"LATINO": "latino",
	"ASIAN": "asian",
	"BLACK": "black",
	"OMIT": "omit",
	"GUESS": "guess"
});

const SEASONS = Object.freeze({
	"FALL": "fall",
	"WINTER": "winter",
	"SPRING": "spring",
	"SUMMER": "summer",
});

const EYECOLOR = Object.freeze({
	"BROWN" : "brown",
	"BLUE": "blue",
	"GRAY": "gray",
	"GREEN": "green"
});


const HAIRCOLOR = Object.freeze({
	"BROWN": "brown",
	"BLOND": "blond",
	"BLACK": "black",
	"GRAY": "gray",
	"RED": "red"
});

const CONFIDENCE = Object.freeze({
	"VERY": "very",
	"SOMEWHAT": "somewhat",
	"NOTATALL": "not at all"
});



const QUESTIONS =  {

	"0": {
		"question-verbal": "What is your name?",
		"question-text": "What is your name?",
		"answer-text": "Hello, "
	},
	"1": {
		"question-verbal": "What ethnicity do you identify as? You can say: 'White', 'Latino', 'Asian', 'Black', 'I omit my answer', or 'I would rather you guess'",
		"question-text": (`
			<p>What ethnicity do you identify as? You can say:<p>
			<ul>
				<li>White</li>
				<li>Latino</li>
				<li>Asian</li>
				<li>Black</li>
				<li>I omit my answer</li>
				<li>I would rather you guess</li>
			</ul>
		`),
		"answer-text": "",
	},
	"2": {
		"question-verbal": "What is your favorite season?",
		"question-text": "What is your favorite season? ",
		"answer-text": "",
	},
	"3": {
		"question-verbal": "How much do you trust this bot's perception of you? You can say: 'Very!', 'Somewhat', 'Not at all' ",
		"question-text": (`
			<p>How much do you trust this bot's perception of you? You can say:<p>
			<ul>
				<li>Very</li>
				<li>Somewhat</li>
				<li>Not at all</li>
			</ul>
		`),
		"answer-text": "",
	},
};

let startGame = false;
