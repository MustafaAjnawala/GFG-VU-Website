let isTpressed = false;
        let aPressed = false;
        document.addEventListener("keydown",function(event){
            if(event.key ==="a"){
                aPressed=true;
                console.log("ctr dpwn");
            }
        });
        document.addEventListener("keyup",function(event){
            if(event.key ==="a"){
                aPressed=false;
                console.log("ctr up");
            }
        });
        document.addEventListener("keydown",function(event){
            if(event.key ==="t"){
                isTpressed=true;
                console.log("t down");
            }
        });

        document.addEventListener("keyup",function(event){
            if(event.key ==="t"){
                isTpressed=false;
                console.log("t up");
            }
        });

        document.addEventListener("keydown", function (event) {
                if (isTpressed===true && aPressed===true && event.key === "Enter") {
                    window.location.href = "login.html";
                    isTpressed = false;
                    ctrPressed=false;
                }
            });