run = async function(){ //dont mind me pretty much prolly breaking every rule of web development >:(... P.S. sorry MDN.

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
            child.document.body.innerHTML = data
        }
        writeHead = (data)=>{
            child.document.head.innerHTML = data
        }
        setup = ()=>{
            this.writeHead('<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>JS Hub</title> <style> @import url(\'https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap\'); body,html{ width: 100%; height: 100%; } .option{ width: 90%; margin: 0 auto; background-color: white; border: 1px solid rgb(141, 141, 141); border-radius: 15px; display: flex; justify-content: space-between; padding: 15px; } .option>span{ font-family: "National Park", sans-serif; font-optical-sizing: auto; font-weight: 400; font-style: normal; } .option>button{ border-radius: 50%; width: 45px; height: 45px; text-align: center; background-color: rgb(255, 255, 255); border: 1px solid rgb(205, 205, 205); cursor: pointer; transition: .25s; } .option>button:hover{ background-color: rgb(214, 214, 214); transition: 1s; } </style>')
            this.writeBody('')
        }
        readBody = ()=>{
            return child.body.innerHTML
        }
        addOn = (data)=>{
            //<div class="option" id="0" style="display: none;"> <span>heya</span> <button>Run</button> </div>
            console.log(data)

            //basic element creation
            const div = document.createElement('div')
            div.classList.add('option')
            
            const span = document.createElement('span')
            span.innerText = data['text']

            const button = document.createElement('button')
            button.innerText = 'RUN'

            //just make sure we save the code with the div. i hope no one finds xss :( anyways, im the only one who can edit the code, so yeah, were safe. i hope.
            div.dataset.code = data['code']

            //glue up
            div.appendChild(span)
            div.appendChild(button)

            //get that last piece to stick
            child.document.body.appendChild(div)
            
            //ok, now for the finishing touches:
            button.addEventListener('click',()=>{
                console.log('clicked')
                eval(div.dataset.code)
            })
        }
    }
    //just to use the class. duh
    ChildFunctions = new ChildFunctions

    //just some base code
    child.document.write('<head></head>\n<body></body>')

    //fetch a website to get some json data :D
    var data = await fetch('https://gist.githubusercontent.com/Null-Austin/46e751c1552dced1b8e9b2d07345f808/raw/codes!')
    var json = await data.json()
    var code = json['code']

    //time for the real action :O
    ChildFunctions.setup()

    ChildFunctions.addOn({"text":"lol","code":"alert(123)"})
    for (const i of code){
        ChildFunctions.addOn({"text":i['title'],"code":i['code']})
    }


}
await run();
