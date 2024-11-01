let login = false
let sinal=true
let loginfo = {
    "email": false,
    "senha": false
}


function menuopen(event) {

    let mn = window.document.getElementById("menula").classList
    mn.toggle('active');
    if (mn.contains('active')) {
        document.getElementById("page_content").style.marginLeft = "300px"
    } else {
        document.getElementById("page_content").style.marginLeft = "0px"
    }
}
if (login == false) {
    function mylogin() {
        let inputs = document.getElementsByClassName("inpd")
        let embox = document.getElementById("eminput")
        let passbox = document.getElementById("passinput")
        let passeye = document.getElementById("passeye")

        function getDayMax(ano, mes) {
            return new Date(new Date(ano, mes, 1) - 1).getDate()
        }
        async function dateFunctions() {
            try{
                let req=await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
                let json=await req.json()
                const hoje=json.datetime
                console.log(hoje)
                const amd=hoje.substring(0,10).split("-")
                let campoano=document.getElementById("yearinp")
                let campomes=document.getElementById("moinp")
                let campodia=document.getElementById("dayinp")
                let max
                let min=new Date(amd[0]-110,1,1)
                if((amd[0]-13)%4!=0 && amd[1]==2 && amd[2]==29){
                    max= new Date(amd[0]-13,amd[1]-1,amd[2]-2)
                } else{
                    max=new Date(amd[0]-13,amd[1]-1,amd[2]-1)
                }
                let maxmonth=max.getMonth()+1
                campoano.value=max.getFullYear()
                campomes.value=maxmonth
                campodia.value=max.getDate()

                function numbUpd(ev){
                    let alvo=ev.target
                    alvo.value.replace(/[^0-9]/g, "")
                    if(alvo==campoano){
                        campoano.value=campoano.value.slice(0,4)
                    } else{
                        alvo.value=alvo.value.slice(0,2)
                    }
                }

                function changes(ev){
                    alvo=ev.target
                    if(alvo==campoano && campoano.value>max.getFullYear()){
                        if((campomes.value<maxmonth || campomes.value==maxmonth && campodia.value<=max.getDate())){
                            campoano.value=max.getFullYear()
                        } else {
                            campoano.value=max.getFullYear()-1
                        }
                    } else if(alvo==campoano && campoano.value<min.getFullYear()){
                        campoano.value=min.getFullYear()
                    } else if((alvo==campomes && alvo.value>12) || (alvo==campomes && campomes.value>maxmonth && campoano.value==max.getFullYear())){
                        if(campoano.value==max.getFullYear()){
                            campomes.value=maxmonth
                        } else {
                            campomes.value=12
                        }
                    } else if(alvo==campomes && alvo.value<1){
                        campomes.value=1
                    }
                    
                    if(campodia.value>max.getDate() && campomes.value==maxmonth && campoano.value==max.getFullYear()){
                        
                        campodia.value=max.getDate()
                    }
                    else if(campodia.value>getDayMax(campoano.value,campomes.value)){
                        campodia.value=getDayMax(campoano.value,campomes.value)
                    } else if(campodia.value<1){
                        campodia.value=1
                    }
                    campodia.value=campodia.value.padStart(2,'0')
                    campomes.value=campomes.value.padStart(2,'0')
                }
                
                for (let i = 0; i<document.getElementsByClassName("numinps").length;i++){
                    document.getElementsByClassName("numinps")[i].addEventListener("input",numbUpd)
                    document.getElementsByClassName("numinps")[i].addEventListener("blur",changes)
                }
            }catch{
                document.getElementById("regp").innerHTML=`<div class="error">
                        <h2>Erro de conexão</h2>
                        <p>Tente recarregar a página</p>
                        <img src="srcs/icons/signal-error.png" alt="">
                        </div>`
            }
        }
        dateFunctions()
        function inputDetecter(event) {
            let dono = event.target
            if (dono.value == "") {
                dono.classList.remove("has-text")
            } else {
                dono.classList.add("has-text")
            }
        }

        
        function emverify(ev) {
            let embox = ev.target
            let logem
            if (embox.id == "eminput") {
                logem = document.getElementById("logem")
            } else {
                logem = document.getElementById("regem")
            }
            let content = embox.value

            if (embox.value.includes("@") && embox.value[0] != "-" && embox.value.split("@")[1].includes(".") && embox.value.split("@")[0].length > 3 && embox.value[0] != "@" && embox.value.split("@")[1].split(".")[0].length >= 2 && embox.value.split("@").length == 2 && embox.value.split("@")[1].split(".")[1].length >= 2) {
                logem.src = "srcs/icons/done.png"
                logem.style.opacity = 1
                loginfo['email'] = true
            } else if (embox.value == "") {
                logem.style.opacity = 0
                loginfo['email'] = false
            } else {
                logem.src = "srcs/icons/cancel.png"
                logem.style.opacity = 1
                loginfo['email'] = false
            }
        }

        function nameVerify(ev) {
            let name=ev.target
            let logem=document.getElementById("nameem")
            if(name.value.length>2){
                logem.src = "srcs/icons/done.png"
                logem.style.opacity = 1
            } else if(name.value==""){
                logem.src = "srcs/icons/done.png"
                logem.style.opacity = 0
            }
             else{
                logem.src = "srcs/icons/cancel.png"
                logem.style.opacity = 1
            }
        }

        function passverify(ev) {
            let logpass
            if (ev.target.id == "passinput") {
                logpass = document.getElementById("logpass")
            } else {
                logpass = document.getElementById("regpass")
            }
            let passbox = ev.target

            if (passbox.value.length >= 8 && (passbox.value.match(/[0-9]/) || passbox.value.match(/[@#$%&*!?_\-+]/))) {
                logpass.style.opacity = 1
                logpass.src = "srcs/icons/done.png"
                loginfo['senha'] = true
            } else if (passbox.value == "") {
                logpass.style.opacity = 0
                loginfo["senha"] = false
            } else {
                logpass.style.opacity = 1
                logpass.src = "srcs/icons/cancel.png"
                loginfo['senha'] = false
            }
        }

        function passview(event) {
            let passeye = event.target
            let passbox

            if (event.target.id.includes("reg")) {
                passbox = document.getElementById("passreg")
            } else {
                passbox = document.getElementById("passinput")
            }

            if (passbox.type == 'password') {
                passbox.type = 'text'
                passeye.src = 'srcs/icons/closedeye.png'
            } else {
                passbox.type = 'password'
                passeye.src = 'srcs/icons/openeye.png'
            }
        }
        function charverify(event) {
            let alvo = event.target

            if (alvo.type == "email") {
                alvo.value = alvo.value.replace(/[^A-Za-z0-9._%+-@]/g, '')
            } else if(alvo==passbox ||alvo==document.getElementById("passreg")){
                alvo.value = alvo.value.replace(/[^A-Za-z0-9._%+-@:;#$%<>]/g, "")
            } else {
                alvo.value = alvo.value.replace(/[^A-Za-z0-9._-]/g, "")
            }
        }

        //alls email
        document.getElementById("backbr").addEventListener("click",ev => {
            document.getElementById("regp").style.display='none'
        })
        document.getElementById("backbl").addEventListener("click",ev => {
            document.getElementById("logp").style.display='none'
        })
        document.getElementById("regb").addEventListener("click", ev => {
            document.getElementById("regp").style.display='flex'
        })
        document.getElementById("logb").addEventListener("click", ev => {
            document.getElementById("logp").style.display='flex'
        })
        document.getElementById("emreg").addEventListener("blur", emverify)
        document.getElementById("passreg").addEventListener("input", charverify)
        document.getElementById("emreg").addEventListener("input", charverify)
        embox.addEventListener("input", charverify)
        document.getElementById("passreg").addEventListener("blur", passverify)
        passbox.addEventListener("input", charverify)
        passbox.addEventListener("blur", passverify)
        embox.addEventListener("blur", emverify)
        passeye.addEventListener("click", passview)
        document.getElementById("user").addEventListener("blur",nameVerify)
        document.getElementById("user").addEventListener("input",charverify)
        document.getElementById("regpasseye").addEventListener("click", passview)
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("input", inputDetecter)
        }
        //
    }
    mylogin()
}


//document.getElementById("page_content").innerHTML=`<div id="banndiv"><img src="srcs/banners/banner.png" alt="banner" id="firstbanner"></div><h1>Ínicio</h1><div name="Faça login" id="log_pop"><h2>Faça login </h2><h3>Com o login você pode acessar suas informações,preferências, instituições, turmas e comunidades.</h3></div>`
window.document.getElementById("menub").addEventListener("click", menuopen)


atualmenu = `<h2>
                Geral
            </h2>
            <button class="mnbts">
                <img src="srcs/icons/home.svg" class="icons2"> Início
            </button>
            <button class="mnbts">
                <img src="srcs/icons/insts.svg" class="icons2"> Minhas instituições
            </button>   
            <button class="mnbts">
                <img src="srcs/icons/coms.svg" class="icons2"> Minhas comunidades
            </button>
            <button class="mnbts">
                <img src="srcs/icons/turma.svg" class="icons2"> Minhas turmas
            </button>
            <button class="mnbts">
                <img src="srcs/icons/hwork.svg" class="icons2"> Tarefas 
            </button>

            <button class="mnbts">
                <img src="srcs/icons/busca.svg" class="icons2"> Descobrir</button>`
document.getElementById("menula").innerHTML = atualmenu