status = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(480 , 340);
    canvas.center();
    video.hide();
}

function draw(){
    image(video , 0 , 0 , 480 , 340);
    
    if(status != ""){
        anannyaa.detect(video , gotresults);

        for(w = 0; w < objects.length; w++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are " + objects.length;
            
            fill("red");
            percent = Math.floor(objects[w].confidence * 100);
            text(objects[w].label + " " + percent + "%" , objects[w].x + 15, objects[w].y + 15);
            noFill()
            stroke("red");
            rect(objects[w].x , objects[w].y , objects[w].width , objects[w].height);
        }
    }
}

function Start(){
    anannyaa = ml5.objectDetector("cocossd" , modelLoaded);

    document.getElementById("status").innerHTML = "Status: Object Detecting";
}

function modelLoaded(){
    console.log("Model Loaded");
    
    status = true;
    video.loop();
    video.speed(1.5);
    video.volume(0);
}

function gotresults(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}