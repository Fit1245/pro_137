objects = [];
video = "";
Status = "";
function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video,0,0,480,380);

    if (Status != "") {
      objectDetector.detect(video,gotResults);
      
      for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "status : object detected";
        document.getElementById("found").innerHTML = objects[i].label+"";

        fill('#FF0000');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
        nofill();
        stroke('#FF0000');
        rect(objects[i].x , objects[i].y , objects[i].height , objects[i].width);
      }
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : object detecting";
}
function modelLoaded() {
    console.log("model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}