
$(document).ready(function() {

    //Antal "likade" produkter
    var likedProducts = 0; 
    
    //hämtar version av internet explorer
    var msie = document.documentMode;
    
    
    /************************
    Laddar in produktlista
    ************************/
    
    //Produktlistans URL
    var url = "http://www.tradera.com/static/images/NO_REV/frontend-task/jsonProductFeedResult.js";

    //När produktlistan har laddats klonar vi vårat "master-item" för att sedan lägga in produkt-specifik data
    $.getScript( url, function() {
        
        //Loopar igenom alla produkter och clonar en .item för varje
        for(var i = 0; i < jsonProductFeedResult.products.length; i++) {
            
            var product = jsonProductFeedResult.products[i];

            //Clonar object och lägger in i DOM
            $clone = $("#item-master").clone().appendTo( "#grid" );

            //0-ställer opacity så att vi sedan kan animera in
            $clone.css("opacity", 0);
            $clone.css("display", "block");
            
            //Lägger in produktens data i clonat objekt
            $clone.attr("id", "");
            $("img.product-img", $clone).attr("src", product.image)
            $("p.product-description", $clone).html(product.title)
            $("p.product-price", $clone).html(product.price + " " + product.currency);
            $("p.product-price", $clone).html(product.price + " " + product.currency);

            //Animerar in .item
            $clone.animate({opacity:1}, 100);
        }

        //Lyssnare för när alla bilder i #grid är laddade
        $('#grid').imagesLoaded( function() {
            
            //undefined - Är inte IE
            if(msie > 9 || msie == undefined) {
				$('#grid').isotope({
				  itemSelector: '.item',
				  percentPosition: true,
				  masonry: {
				    columnWidth: '#item-master'
				  }
				});
			}

        });
        
        //Binder klick event till like knapparna
        $(".like-button").click(likeButtonClick);

    });

    
    //Event för när användaren klickar på like-knapp
    function likeButtonClick() {
        
        //Binder knappens parent - .item
        var $parent = $(this).parent();

        //Kollar om produkten redan är "likad"
        if($parent.hasClass("liked")) {
            
            $parent.removeClass("liked");

            $("img", this).attr("src", "images/heart.png");      

            $("p", this).html("Gilla");
            
            //Minskar antalet likes
            likedProducts--;
        }
        //om produkten inte är likad
        else if(!$parent.hasClass("liked")) {
            
            $parent.addClass("liked");

            $("img", this).attr("src", "images/heart-liked.png");

            $("p", this).html("Gillad");
            
            //Ökar antalet likes
            likedProducts++;    
        }
        
        //Uppdaterar statusbaren med rätt antal likes
        updateStatusbar();
    }

    //Uppdaterar statusbaren med antal "likes"
    function updateStatusbar() {
        
        $likeCount = $("p#like-count");

        $likeCount.css("opacity", "0");

        $likeString = "";
        
        //Hämtar string för antalet likes
        $likeCount.html(getLikeString());

        $likeCount.css("opacity", "0");

        $likeCount.animate({opacity:1}, 300);
    }

    //Skapar "like" string till statusbaren
    function getLikeString() {

        if(likedProducts == 0) {
            
            return "Inga gillade produkter";
        }
        else if(likedProducts == 1) {
            
             return "1 gillad produkt";   
        }
        else if(likedProducts > 1) {
            
             return likedProducts + " gillade produkter";   
        }    
        
        return "";
    }    
});

