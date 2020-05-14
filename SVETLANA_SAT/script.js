HTTP = new Http;
UI = new Ui;
SORT = new Sort;

$(document).ready(() => getProducts())

//GET PRODUCTS
function getProducts() {
    HTTP.get('http://localhost:3000/products', 500)
        .then(data => UI.showProducts(data))
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
        HTTP.get(`http://localhost:3000/products/${id}`, 500)
        .then(data => showProduct(data, id))
        .catch(err => console.log(err)) 
    }
})
function showProduct(data, id){
    $("#content").show();
    $('.submit-btn').attr('id', id)
    UI.fillFields(data);
}

$('#price').focusout(function() {
    if (this.value.indexOf("$") != 0)
{
this.value = this.value.replace(/ ^[$]/g,"");
this.value = "$" + this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

})
$('#price').focus(function() {
    this.value=this.value.replace(/[\$\s,]/g, '')
})
;

// SHOW CONFIRM BEFORE DELETE ITEM
$("#table").click(function(e){
    if(e.target.classList.contains('delete')) {
    const id = e.target.dataset.id,
          name = e.target.parentElement.previousElementSibling.previousElementSibling.children[0].textContent
        console.log(name)
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
    UI.showAlert(`${name} removed`, 'alert alert-success')
    HTTP.delete(url, 1000)
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
    UI.changeInputClass()
    const parcePrice = $('#price').val().replace(/[\$\s,]/g, '');
    const data = {
        title: $('#title').val(),
        email: $('#email').val(),
        count: $('#count').val(),
        price: parcePrice
        }
        id = e.target.id;
        reg = /^[a-z\d_\.-]+@[a-z\d-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        num = /^\d+$/;
        total = /^[\d]+(\.\d{1,2})?$/
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
        parseFloat(parcePrice).toFixed(2)
        data.price = parseFloat(parcePrice);
    //Add new product
    if(id === '') {
        UI.clearFields();
        UI.showAlert(`${data.title} added`, 'alert alert-success');
        HTTP.post('http://localhost:3000/products',1000, data)
    .then( data => getProducts())
    .catch(err => console.log(err))
    } else {
    //Or
    //Update product
        UI.clearFields()
        UI.showAlert(`${data.title} updated`, 'alert alert-success');
        HTTP.put(`http://localhost:3000/products/${id}`,1000, data)
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
        HTTP.get(`http://localhost:3000/products/${id}`, 500)
        .then(data => {UI.fillFields(data); 
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
    UI.clearFields()
    UI.changeInputClass()
});

$("#cancel").click(function(){
    UI.clearFields()
    UI.changeInputClass()
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
$('#filter-text').keypress(function(event){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        filterProducts() 
    }
});

$('#filter').click(function(){
    filterProducts() 
})

function filterProducts(){
    const text = $('#filter-text').val().toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function(name){
    const item = name.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
        name.parentElement.parentElement.style.display = '';
    } else {
        name.parentElement.parentElement.style.display = 'none';
    }
    }) 
}

//SORT BY A-Z
$("#sort-a-z").click(function (e) {
    $("#sort-0-9 .fa-caret-up, #sort-0-9 .fa-caret-down").remove();
    $("#sort-0-9").removeClass('up, down').addClass('sort-by-price')
    if(e.target.classList.contains('sort-by-name')){
        HTTP.get('http://localhost:3000/products', 0)
            .then(data => SORT.byAZ(data))
            .catch(err => console.log(err))
    }
    else if(e.target.classList.contains('down')){
        HTTP.get('http://localhost:3000/products', 0)
            .then(data => SORT.byZA(data))
            .catch(err => console.log(err))
    } else {
        $(".fa-caret-up").remove();
        $("#sort-a-z").removeClass('up').addClass('sort-by-name')
        HTTP.get('http://localhost:3000/products', 0)
            .then(data => UI.showProducts(data))
            .catch(err => console.log(err))
    }
});

$("#sort-0-9").click(function (e) {
    $("#sort-a-z .fa-caret-up, #sort-a-z .fa-caret-down").remove();
    $("#sort-a-z").removeClass('up, down').addClass('sort-by-name')
    if(e.target.classList.contains('sort-by-price')){
        HTTP.get('http://localhost:3000/products', 0)
            .then(data => SORT.byIncrease(data))
            .catch(err => console.log(err))
    }
    else if(e.target.classList.contains('down')){
        HTTP.get('http://localhost:3000/products', 0)
            .then(data => SORT.byDecrease(data))
            .catch(err => console.log(err))
    } else {
        $(".fa-caret-up").remove();
        $("#sort-0-9").removeClass('up').addClass('sort-by-price')
        HTTP.get('http://localhost:3000/products', 0)
            .then(data => UI.showProducts(data))
            .catch(err => console.log(err))
    }
});



