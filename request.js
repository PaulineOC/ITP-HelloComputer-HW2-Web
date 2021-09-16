const getPicture = () => {

	const api_key=`qQ7BFMyAq2s5sb3PDfGVAQ`;

	let url = `https://api.generated.photos/api/v1/faces?`;
	// Pre-generated model and hair-length: 
	url+=`?model=${sessionAnswers.model}?hair_length=${sessionAnswers["hair-length"]}`;
	
	if(sessionAnswers.ethnicity){
		url+= `?ethnicity=${sessionAnswers.ethnicity}`;
	}
	//Add eye-color, hair-color, confidence queries
	url+=`?eye_color=${sessionAnswers["eye-color"]}?hair_color=${sessionAnswers["hair-color"]}?confidence=${1}`;
	
	if(sessionAnswers.age){
		url+=`?age=${sessionAnswers.age}`;
	}
    if(sessionAnswers.gender){
        url+=`?gender=${sessionAnswers.gender}`;
    }

	console.log(url);

	fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `API-Key ${api_key}`,
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then((result)=>{

    	const filteredEthnicity = result.faces.filter((currFace)=>{
    		const ethnicity = currFace.meta.ethnicity[0];
    		return ethnicity.toLowerCase() === sessionAnswers.ethnicity;
    	});
    	console.log(filteredEthnicity);
    	const randomIdx = Math.floor(Math.random() * filteredEthnicity.length);
    	console.log(randomIdx);
    	
    	const faceURL = filteredEthnicity[randomIdx]["urls"][4]["512"];

    	const finalPic = document.getElementById("final-pic");
        console.log('final URL:', finalPic);
    	finalPic.src = faceURL;
    	finalPic.classList.toggle("hidden");

		document.getElementById("loading").textContent = `${sessionAnswers.name}, the bot determines you look like this: `;
    })
    .catch(error => {
    	console.log('Error in fetch: ');
    	console.log(error);
    });
};


const getGender = (name, cb) => {
	const API_KEY =`SAopJyCjDA25cA2gYVbDUq8uLNZXwmpDN5Kf`;
	const nameURL = `https://gender-api.com/get?name=${name}&key=${API_KEY}`;

    fetch(nameURL, {
        method: 'GET',
        mode: 'cors',
    }).then(response => response.json()).then((result)=>{
        console.log(result);

        const gender = result.gender;

        if(gender.includes(SEX.FEMALE)){
            saveFinalAnswer("gender",SEX.FEMALE);

        }
        else if(gender.includes(SEX.MALE)){
            saveFinalAnswer("gender",SEX.MALE);
        }
        else{
            saveFinalAnswer("gender",null);
        }
        cb(gender);
    })
    .catch(error => {
        console.log('Error in fetch: ');
        console.log(error);
    });

}