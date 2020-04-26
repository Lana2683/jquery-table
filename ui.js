class Ui {

    showProducts(products) {
        $("#table").text('')
        products.map((product) => {
            $('#table').append(
            `<tr>
                <td><a href="#" 
                       class="text-info h6 item-link collection-item" 
                       data-id="${product.id}">${product.title}
                    </a>
                </td>
                <td>$${product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td class="d-flex justify-content-between">
                    <a href="#" 
                       class="edit btn btn-outline-secondary w-50 mr-1" 
                       type="button" data-id="${product.id}">Edit
                    </a>
                    <button class="delete btn btn-outline-danger w-50" 
                            type="button" data-id="${product.id}"">Delete
                    </button>
                </td>
            </tr>`)
    })
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
        $('#price').val("$" + data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#email').val(data.email);
        $('#count').val(data.count);
    }

    changeInputClass() {
        $("#productForm input").removeClass("is-invalid")
    } 
}
