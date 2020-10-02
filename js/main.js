(function () {
    'use strict'

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')

        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
    }, false)

    let loader =  $('#loader')

    $('#submit').click(function () {
        $('.error-input').hide()
        let name = $('#name')
        let adress = $('#adress')
        let number = $('#number')

        let hasError = false

        if (!name.val()) {
            name.siblings('.error-input').show();
            name.css('border-color', 'red')
            hasError = true
        } else {
            name.css('border-color', 'rgb(185, 145, 80)')
        }
        if (!adress.val()) {
            adress.siblings('.error-input').show();
            adress.css('border-color', 'red')
            hasError = true

        } else {
            adress.css('border-color', 'rgb(185, 145, 80)')
        }
        if (!number.val()) {
            number.siblings('.error-input').show();
            number.css('border-color', 'red')
            hasError = true
        } else {
            number.css('border-color', 'rgb(185, 145, 80)')
        }
        if (!hasError) {
            loader.css('display', 'flex')
            $.ajax({
                method: "POST",
                url: 'https://itlogia.ru/test/checkout',
                data: {name: name.val(), adress: adress.val(), number: number.val()}
            })
                .done(function(message) {
                    loader.hide();
                    if (message.success) {
                        $('#order-form').hide()
                        $('#success').show()
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                    }
            });
        }
    });



}())