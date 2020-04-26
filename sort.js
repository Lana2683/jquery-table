class Sort {

    byAZ(products){
        products.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            } 
            else {
                return-1;
            }
        })

        ui.showProducts(products);
        if($(".fa-caret-up")){
            $(".fa-caret-up").replaceWith("<i class='fas fa-caret-down float-right mt-1'>");
            $("#sort-a-z").removeClass('sort-by-name').addClass('down');
        }
        $("#sort-a-z").removeClass('sort-by-name').append("<i class='fas fa-caret-down float-right mt-1'>").addClass('down');
    }

    byZA(products){
        products.sort((a, b) => {
            if (a.title < b.title) {
                return 1;
            } 
            else {
                return -1;
            }
        })

        ui.showProducts(products)
        $(".fa-caret-down").replaceWith("<i class='fas fa-caret-up float-right mt-1'>");
        $("#sort-a-z").removeClass('down').addClass('up');
    }

    byIncrease(products){
        products.sort((a, b) => {
            if (parseFloat(a.price) > parseFloat(b.price)) {
                return 1;
            } 
            else {
                return -1;
            }
        })

        ui.showProducts(products)
        if($(".fa-caret-up")){
            $(".fa-caret-up").replaceWith("<i class='fas fa-caret-down float-right mt-1'>");
            $("#sort-0-9").removeClass('sort-by-price').addClass('down');
        }
        $("#sort-0-9").removeClass('sort-by-price').append("<i class='fas fa-caret-down float-right mt-1'>").addClass('down');
    }

    byDecrease(products){
        products.sort((a, b) => {
            if (parseFloat(a.price) < parseFloat(b.price)) {
                return 1;
            } 
            else {
                return -1;
            }
        })

        ui.showProducts(products)
        $(".fa-caret-down").replaceWith("<i class='fas fa-caret-up float-right mt-1'>");
        $("#sort-0-9").removeClass('down').addClass('up');
    }
}
