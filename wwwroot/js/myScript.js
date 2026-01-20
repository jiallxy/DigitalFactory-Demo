function ToGreenBackground(){
    document.body.style.backgroundColor="GREEN";
}
function ToRedBackground(){
    document.body.style.backgroundColor="RED";
    document.title=Max(4,2022 );
}
function Max(n1,n2){
    if(n1>n2)
    {return n1;}
    else
    {return n2;}
}
function ToggleLightAndDark(){
    document.body.classList.toggle("my-dark-mode");
}

function copyUrl() {{
    var copyText = document.getElementById('webUrl');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    
    // Show a temporary success message
    var msg = document.getElementById('copyMessage');
    msg.style.display = 'inline';
    setTimeout(function() {{ msg.style.display = 'none'; }}, 2000);
}}