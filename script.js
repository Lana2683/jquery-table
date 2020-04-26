const http = new Http,
      ui = new Ui,
      sort = new Sort;

$(document).ready(() => getProducts())

//GET PRODUCTS
function getProducts() {
    http.get('http://localhost:3000/products', 500)
        .then(data => ui.showProducts(data))
        .catch(err => console.log(err))
}

//SHOW FORM FOR ADD PRODUCT
$("#add").click(function(){
    $("#productForm input").removeAttr('readonly');
    $("#content,.delivery, #label-delivery, .submit-btn, #cancel, .cities-body").show();
});

//SHOW EDIT FORM
$("#table").click(function(e){
    e.preventDefault();
    const id = e.target.dataset.id;
    
    if(e.target.classList.contains('edit')) {
        http.get(`http://localhost:3000/products/${id}`, 500)
        .then(data => showProduct(data, id))
        .catch(err => console.log(err)) 
    }
})
function showProduct(data, id){
    $("#content").show();
    $('.submit-btn').attr('id', id)
    ui.fillFields(data);
    $('#price').focusout(function() {
       
        // this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
        if (this.value.indexOf("$") != 0)
   {
    this.value = this.value.replace(/ ^[$]/g,"");
    this.value = "$" + this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

    })
    $('#price').focus(function() {
        this.value=this.value.replace(/[\$\s,]/g, '')
    })
}
;

// SHOW CONFIRM BEFORE DELETE ITEM
$("#table").click(function(e){
    if(e.target.classList.contains('delete')) {
    const id = e.target.dataset.id,
          name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        $("#del-modal-header").text(name);
        $('.yes').attr('data-id', id)
        $("#delete-modal").show();
    }
});

//DELETE PRODUCT
$('.yes').click(function(e) {
    e.preventDefault();
    const id = e.target.dataset.id,
          name = $("#del-modal-header").text();

    deleleProduct(`http://localhost:3000/products/${id}`, name)
  })
  
function  deleleProduct(url, name) {
    ui.showAlert(`${name} removed`, 'alert alert-success')
    http.delete(url, 1000)
        .then(data => getProducts())
        .catch(err => console.log(err))
        $("#delete-modal").hide();
}

// CLOSE CONFIRM
$("#close-delete-modal").click(function(){
    $("#delete-modal").hide();
});
$("#no").click(function(){
    $("#delete-modal").hide();
});

//SUBMIT NEW PRODUCT OR UPDATE PRODUCT
$('.submit-btn').click(function(e){
    e.preventDefault();
    ui.changeInputClass()
    const data = {
        title: $('#title').val(),
        email: $('#email').val(),
        count: $('#count').val(),
        price: $('#price').val().replace(/[\$\s,]/g, '')
        }
        id = e.target.id;
        reg = /^[a-z\d_\.-]+@[a-z\d-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        num = /^\d+$/;
        total = /^[\d]+(\.\d{2})?$/
    
    //Validation
    if(5 > data.title.length  || data.title.length > 15  || !data.title.trim()||data.title === '') {
        $("#title").addClass("is-invalid").focus();
    }
    if(!reg.test(data.email)) {
        $("#email").addClass("is-invalid")
        $("#title").is( ":focus" )?null:$('#email').focus()
    } 
    if(!num.test(data.count)) {
        $("#count").addClass("is-invalid");
        $('#title').is( ":focus" )||$('#email').is( ":focus" )?null:$('#count').focus()
    }
    if(!total.test(data.price)) {
        $("#price").addClass("is-invalid");
        $('#title').is( ":focus" )||$('#email').is( ":focus" )||$('#count').is( ":focus" )?null:$('#price').focus()
    }
    else if(!$("#productForm input").hasClass("is-invalid")) {

    //Add new product
    if(id === '') {
        ui.clearFields();
        ui.showAlert(`${data.title} added`, 'alert alert-success');
        http.post('http://localhost:3000/products',1000, data)
    .then( data => getProducts())
    .catch(err => console.log(err))
    } else {
    //Or
    //Update product
        ui.clearFields()
        ui.showAlert(`${data.title} updated`, 'alert alert-success');
        http.put(`http://localhost:3000/products/${id}`,1000, data)
        .then(data => {
            getProducts();
            $('.submit-btn').attr('id', '')})
        .catch(err => console.log(err));
    }
}
})

//PRODUCT NAME IS LINK TO PRODUCT INFO
$("#table").click(function(e){
    const id=e.target.dataset.id
    if(e.target.classList.contains('item-link')) {
        http.get(`http://localhost:3000/products/${id}`, 500)
        .then(data => {ui.fillFields(data); 
            $("#content").show();
            $(".delivery,#label-delivery, .submit-btn, #cancel, .cities-body").hide();
            $("#productForm input").attr('readonly', true)
        })
        .catch(err => console.log(err))
    } else {
        $(".delivery,#label-delivery, .submit-btn, #cancel, .cities-body").show();
        $("#productForm input").removeAttr('readonly')
    }
});

//CLOSE MODAL OR CANCEL CHANGES
$("#close").click(function(){
    ui.clearFields()
    ui.changeInputClass()
});

$("#cancel").click(function(){
    ui.clearFields()
    ui.changeInputClass()
});


// SELECT COUNTRY START
$("select").change(function() {
    $("select option:selected").each(function() {
        $('.checkboxes').find('input[type="checkbox"]').prop('checked', false);
        $('#select-all').prop('checked', false);
        if($( this ).text() == 'Russia'){
            $('#city1').text('Saratov'); 
            $('#city2').text('Moscow');
            $('#city3').text('St-Petersburg');
            $('#cities').show();
        } else if($( this ).text() == 'Belarus'){
            $('#city1').text('Gomel'); 
            $('#city2').text('Minsk');
            $('#city3').text('Grodno');
            $('#cities').show();
        } else if($( this ).text() == 'USA'){
            $('#city1').text('New-York'); 
            $('#city2').text('Sidnay');
            $('#city3').text('Chicago');
            $('#cities').show();
        } else {
            $('#cities').hide();
        }
    });
})
.trigger( "change" );

// SELECT ALL START
$('#select-all').change(function(e) {
    if(e.currentTarget.checked) {
    $('.checkboxes').find('input[type="checkbox"]').prop('checked', true);
    } else {
    $('.checkboxes').find('input[type="checkbox"]').prop('checked', false);
    }
});

//FILTER PRODUCTS
$('#filter').click(function(){
    const text = $('#filter-text').val().toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function(name){
    const item = name.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
        name.parentElement.parentElement.style.display = '';
    } else {
        name.parentElement.parentElement.style.display = 'none';
    }
})

})

//SORT BY A-Z
$("#sort-a-z").click(function (e) {
    $("#sort-0-9 .fa-caret-up, #sort-0-9 .fa-caret-down").remove();
    $("#sort-0-9").removeClass('up, down').addClass('sort-by-price')
    if(e.target.classList.contains('sort-by-name')){
    http.get('http://localhost:3000/products', 500)
    .then(data => sort.byAZ(data))
    .catch(err => console.log(err))
    }
    else if(e.target.classList.contains('down')){
        http.get('http://localhost:3000/products', 500)
    .then(data => sort.byZA(data))
    .catch(err => console.log(err))
    } else {
        $(".fa-caret-up").remove();
        $("#sort-a-z").removeClass('up').addClass('sort-by-name')
        getProducts()
    }
});

$("#sort-0-9").click(function (e) {
    $("#sort-a-z .fa-caret-up, #sort-a-z .fa-caret-down").remove();
    $("#sort-a-z").removeClass('up, down').addClass('sort-by-name')
    if(e.target.classList.contains('sort-by-price')){
    http.get('http://localhost:3000/products', 500)
    .then(data => sort.byIncrease(data))
    .catch(err => console.log(err))
    }
    else if(e.target.classList.contains('down')){
        http.get('http://localhost:3000/products', 500)
    .then(data => sort.byDecrease(data))
    .catch(err => console.log(err))
    } else {
        $(".fa-caret-up").remove();
        $("#sort-0-9").removeClass('up').addClass('sort-by-price')
        getProducts()
    }
});



