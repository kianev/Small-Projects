io("wss://fx.now.sh/").on("data", function(d){
    document.body.innerHTML=JSON.stringify(d);
});
