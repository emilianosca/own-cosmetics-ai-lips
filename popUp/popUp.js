// PopUp generates a modal window

function mainPopUp() {
    /*=============== SHOW MODAL ===============*/
    const showModal = (openButton, modalContent) =>{
        const openBtn = document.getElementById(openButton),
        modalContainer = document.getElementById(modalContent)
        
        if(openBtn && modalContainer){
            openBtn.addEventListener('click', ()=>{
                modalContainer.classList.add('show-modal')
                hideOpenModal('open-modal') // hide open modal button
            })
        }
    }


    /*=============== SHOW AND HIDE OPENMODAL ===============*/
    const hideOpenModal = (openButton) =>{ 
        document.getElementById(openButton).style.display = 'none'    
    }
    const showOpenModal = (openButton) =>{ 
        document.getElementById(openButton).style.display = 'block'
    }

    /*=============== SHOW MODAL ===============*/
    showModal('open-modal','modal-container')

    /*=============== CLOSE MODAL ===============*/
    const closeBtn = document.querySelectorAll('.close-modal')

    function closeModal(){
        const modalContainer = document.getElementById('modal-container')
        modalContainer.classList.remove('show-modal')
        showOpenModal('open-modal') // show open modal button
    }
    closeBtn.forEach(c => c.addEventListener('click', closeModal))
}

mainPopUp();

