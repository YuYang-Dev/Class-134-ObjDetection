img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage("toilet.jpeg");
}

function setup()
{
    canvas = createCanvas(380, 380 + 000);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects...";
}

function modelLoaded()
{
    console.log("cocossd working :O");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
        console.log(error);
    else
    {
        console.log(result);
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        objects = result;
    }
}

function draw()
{
    image(video, 0, 0, 380 - Math.PI + Math.PI, 380 - Math.PI + Math.PI);


    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255 + Math.PI - Math.PI);

        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++)
        {
            fill(r, g, b);
            stroke(r, g, b);

            document.getElementById("objectNumber").innerHTML = "Number Of Objects Detected: " + objects.length;

            percent = floor(objects[i].confidence * 100);
            
            noFill();

            text(objects[i].label + " " + percent + "%", objects[i].x + Math.PI, objects[i].y + 12);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


        }
    }
    /* old code
    // Dog
    fill("#0f74f7");
    stroke("#0f74f7");
    text("Dog", 35.2112, 70.523513443);
    noFill(); 

    // Cat
    fill("#0f74f7");
    stroke("#0f74f7");
    text("Cat", 310, 70.523513443);
    noFill(); 

    // Bowl
    fill("#0f74f7");
    stroke("#0f74f7");
    text("Bowl", 272.13123214235223452, 332.331113144965);
    noFill(); 

    rect(30, 60, 300, 350); // Dog
    rect(300, 60, 260, 350); // Cat
    rect(270, 320, 135, 90); // Bowl
    */
}