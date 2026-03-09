let myLeads = []
const saveBtn = document.getElementById('save-btn')
const tabBtn = document.getElementById('tab-btn')
const delBtn = document.getElementById('del-btn')
const inputEl = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')

chrome.storage.local.get(['myLeads'], function(result) {
    if (result.myLeads) {
        myLeads = result.myLeads
        render(myLeads)
    }
})

function render(leads){
    let data = ''

    for(let i = 0; i < leads.length; i++){
        data += `<li> 
        
                <a href='${leads[i]}' target= "_blank" >
                    ${leads[i]}
               </a>     
            </li>`
    }

    ulEl.innerHTML = data
}




saveBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ''
    chrome.storage.local.set({myLeads: myLeads})
    render(myLeads)
})


delBtn.addEventListener('dblclick', function(){
    chrome.storage.local.clear()
    myLeads = []
    render(myLeads)
})


tabBtn.addEventListener('click', function(){
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function (tabs) {

        myLeads.push(tabs[0].url)
        chrome.storage.local.set({myLeads: myLeads})
        render(myLeads)
});
})
