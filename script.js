function ImgView(){
    let imgholder=document.getElementById("imgholder")
    let cancel=document.getElementById("canc-but")
    let popup=document.getElementById("imgpopup")
    function imgOpen(ev){
        let img=ev.target
        imgholder.src=img.src
        popup.style.display="flex"
    }
    function imgClose(){
        popup.style.display="none"
    }
    let page_imgs=document.getElementsByClassName("opimg")
    for(let i=0;i<(page_imgs.length);i++){
        page_imgs[i].addEventListener("click",imgOpen)
    }
    cancel.addEventListener("click",imgClose)
}ImgView()
