var pallete$$module$src$js$palletes=function(a){for(var b in a)"object"!=typeof a[b]&&(a[b]={color:a[b]}),a[b].font||(a[b].font="black"),a[b].select||(a[b].select=!1);this.colors=a};
pallete$$module$src$js$palletes.prototype.generatePallete=function(){var a=document.createElement("ul");a.classList="styleNote";a.id="styleNote"+document.querySelectorAll(".styleNote").length;for(var b in this.colors)if(!this.colors[b].select){var c=document.createElement("li");c.id="colorNote-"+b;c.classList="prefered";c.style.background=this.colors[b].color;a.appendChild(c)}return a};
var defaultPallete$$module$src$js$palletes=new pallete$$module$src$js$palletes([{color:"#2f3640",font:"white"},"#fd9644","#f1c40f","#26de81","#2bcbba","#9c88ff"]),$jscompDefaultExport$$module$src$js$palletes=defaultPallete$$module$src$js$palletes,module$src$js$palletes={};module$src$js$palletes.default=$jscompDefaultExport$$module$src$js$palletes;
