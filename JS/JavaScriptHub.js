const run = async function(){ //dont mind me pretty much prolly breaking every rule of web development >:(... P.S. sorry MDN.

    //opens up a new child
    const child = window.open('about:blank','_blank',`
        width=600,
        height=600,
        top=100,
        left=100,
        toolbar=no,
        location=no,
        status=no,
        menubar=no,
        resizable=yes
    `);

    //functions :D
    //a simple function to write to the child :)
    class ChildFunctions {
        writeBody = (data)=>{
            child.document.body.innerHTML = data;
        }
        writeHead = (data)=>{
            child.document.head.innerHTML = data;
        }
        setup = async ()=>{
            var data = await fetch('https://raw.githubusercontent.com/Null-Austin/Javascript-web-code/refs/heads/main/data/JSHUB.html');
            var text = await data.text();
            child.document.write(text)
        }
        readBody = ()=>{
            return child.body.innerHTML;
        }
        addOn = (data)=>{
            //<div class="option" id="0" style="display: none;"> <span>heya</span> <button>Run</button> </div>
            console.log(data);

            //basic element creation
            const div = document.createElement('div');
            if (data['trust']){
                div.dataset.trusted = 'true'
            }else{
                div.dataset.trusted = 'false'
            }
            div.classList.add('option');
            
            const span = document.createElement('span');
            span.innerText = `${data['text']}`;

            span.appendChild(document.createElement('br'))

            const span2 = document.createElement('span')
            span2.innerHTML = `${data['author']}`
            span2.style.color = 'blue'
            span2.style.textDecoration = 'underline'
            span2.style.cursor = 'pointer'
            span2.addEventListener('click',(e)=>{
                window.open(`https://github.com/${data['author']}`,'_blank','popup')
            })

            const button = document.createElement('button');
            button.innerText = 'RUN';

            //just make sure we save the code with the div. i hope no one finds xss :( anyways, im was only one who can edit the code, so yeah, were safe. i hope. just run the verified green code
            div.dataset.code = data['code']

            //glue up
            div.appendChild(span);
            div.appendChild(span2)
            div.appendChild(button);

            //get that last piece to stick
            child.document.body.appendChild(div);
            
            //ok, now for the finishing touches:
            //button clicks :D
            button.addEventListener('click',()=>{
                console.log('clicked');
                if (span.style.color === 'green'){
                    eval(data['code'])
                } else{
                    if (child.window.confirm('-This code was not created by the creator of the website-\nAre you sure you want to run it?')){
                        eval(data['code'])
                    }
                }
            })
            //Verifed green text :D
            span.style.color = 'red'
            if (data['trust'] === true){
                span.style.color = 'green'
                span.innerText = `[✓] ${span.innerText}`
                //span.title = 'The "[✓]" means that this code was written by the author of this project.'
                span.classList.add('tooltip')
                span.dataset.tooltip = 'The "[✓]" means that this code was written by the author of this project.'
            }
        }
    }
    //just to use the class. duh
    ChildFunctions = new ChildFunctions;

    //just some base code
    child.document.write('<head></head>\n<body></body>');

    //fetch a website to get some json data :D
    var data = await fetch('https://raw.githubusercontent.com/Null-Austin/Javascript-web-code/refs/heads/main/data/codes.json');
    var json = await data.json();
    var code = json['code'];

    //time for the real action :O
    await ChildFunctions.setup();

    for (const i of code){
        ChildFunctions.addOn({"text":i['title'],"code":i['code'],"trust":i['trusted'],"author":i['Author']});
    }

    //if you see this, your cool btw.

    mouseTracker = (child)=>{
        console.log('mouse tracker')
    
    
        //Just some management for the mouse
        class mouseManager {
            constructor(){
                this.mousex = 0
                this.mousey = 0
            }
            setMouse = (e)=>{
                this.mousex = e.clientX
                this.mousey = e.clientY
            }
            getMouse = (e)=>{
                return [this.mousex,this.mousey]
            }
        }
        var mouse = new mouseManager
    
        // more indepth mouse management and mouse tracking :D
        child.document.addEventListener('mousemove',(e)=>{
            //just to give data to the stealers >:)
            mouse.setMouse(e)
            //nah, just joking
            var mousedata = mouse.getMouse()
            div.style.left = (mousedata[0])+'px'
            div.style.top = (mousedata[1]-div.offsetHeight)+'px'
        })
    
        //creating the tool tip
        const div = document.createElement('div')
        div.style.display = 'none'
        div.style.position = 'absolute'
        div.style.background = 'rgba(0, 0, 0, 0.8)'
        div.style.left = '20px'
        div.style.top = '20px'
        div.style.color = 'white'
        div.style.padding = '2px'
        
        div.innerText = 'weird you see this? this tooltip is impossible to see regularly?... HACKER!!!' //just some dumb code lol.
    
        child.document.body.appendChild(div)
    
        for (const tip of child.document.getElementsByClassName('tooltip')){
            tip.addEventListener('mouseenter',(e)=>{
                div.style.display = 'block'
                div.innerText = tip.dataset.tooltip
            })
            tip.addEventListener('mouseleave',(e)=>{
                div.style.display = 'none'
            })
        }
    }
    mouseTracker(child)
}
await run();
//its 9 P.M. you have been holding me for a week... please let me go back to my family...
//Never.
