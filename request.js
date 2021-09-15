const getPicture = () => {
	console.log("in get picture");

	// For testing: 
	sessionAnswers = {
		"name": "Test",
		"model": "1",
		"hair-length": "medium",
		"eye-color": "brown",
		"confidence": 0.1,
	};

	const api_key=`qQ7BFMyAq2s5sb3PDfGVAQ`;

	let url = `https://api.generated.photos/api/v1/faces?`;
	// Pre-generated model and hair-length: 
	url+=`?model=${sessionAnswers.model}?hair_length=${sessionAnswers["hair-length"]}`;
	
	if(sessionAnswers.ethnicity){
		url+= `?ethnicity=${sessionAnswers.ethnicity}`;
	}
	//Add eye-color, hair-color, confidence queries
	url+=`?eye_color=${sessionAnswers["eye-color"]}?hair_color=${sessionAnswers["hair-color"]}?confidence=${sessionAnswers.confidence}`;


	console.log(url);

	fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `API-Key ${api_key}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then((result)=>{

    	const firstFace = result.faces[0];
    	console.log(firstFace);
    	
    	const firstFaceURL = firstFace["urls"][4]["512"];

    	const finalPic = document.getElementById("final-pic")
    	finalPic.src = firstFaceURL;
    	finalPic.classList.toggle("hidden");

		document.getElementById("loading").textContent = `${sessionAnswers.name}, the bot determines you look like this: `;

    })
    .catch(error => {
    	console.log('Error in fetch: ');
    	console.log(error);
    });
};