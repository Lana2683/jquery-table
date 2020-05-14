class Ui {
    
    showProducts(products) {
        let templ = _.template($('#prod-table').html())
        let templRes = templ({'products': products});
        $('#table').html(templRes)
    }

    showAlert(message, className) {
        const div = document.createElement('div');

        div.className = className;
        div.append(document.createTextNode(message));
        $('#products').before(div)

        setTimeout(() => {
          this.clearAlert();
        }, 2000);
    }

    clearAlert() {
        const currentAlert = $('.alert');
    
        if(currentAlert) {
          currentAlert.remove();
        }
    }

    clearFields() {
        $("#content").hide();
        $('#title').val('');
        $('#email').val('');
        $('#count').val('');
        $('#price').val('');
        $('#cities').hide();
        $("#select-country").prop('selected', true);
    }

    fillFields(data) {
        $('#title').val(data.title);
        $('#price').val("$" + String(data.price).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#email').val(data.email);
        $('#count').val(data.count);
    }

    changeInputClass() {
        $("#productForm input").removeClass("is-invalid")
    } 
}
