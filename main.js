stat="";
res = ""
function setup(){
canvas = createCanvas(300,300);
canvas.position(490,150);
video = createCapture(VIDEO);
video.size(300,300);
video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("stat").innerHTML = "Status: Detecting Objects";
    inp= document.getElementById("inp").value;    
}

function modalLoaded(){
console.log("Modale Loaded bruhhhhhhhhhhhhhhh");
stat = true;    
}

function gotResults(error,results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=(results);
}

function draw(){
image(video, 0, 0, 300, 300);

if(stat != ""){
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("stat").innerHTML = "Status : Objects Detected"
        document.getElementById("num").innerHTML= "Number of objects detected are :"+ objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        tex=text(objects[i].label + "" + percent +"%" , objects[i].x + 15 , objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    if(tex == inp){
     video.stop();
     objectDetector.detect(gotResults);
     document.getElementById("inf").innerHTML= "Object Mentioned found";
     synth = window.SpeechSynthesis;
     utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
     synth.speak(utterThis);
    }
    else{
        document.getElementById("inf").innerHTML= "Object Mentioned not found";
        synth = window.SpeechSynthesis;
        utterThis = new SpeechSynthesisUtterance("Object Mentioned not Found");
        synth.speak(utterThis);    
    }
    
}
}