const fields = document.querySelectorAll("[required]")


function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for (let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            password: {
                valueMissing: "A senha deve ter entre 4 e 60 caracteres."
            },
            email: {
                valueMissing: "Informe um email ou número de telefone válido.",
                typeMismatch: "Informe um email válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("actives")
            spanError.innerHTML = message
            spanError.style.borderTopColor = "orange"
        } else {
            spanError.classList.remove("actives")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()


        if (error) {
            const message = customMessage(error)

            setCustomMessage(message)
        } else {

            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for (field of fields) {
    field.addEventListener("invalid", event => {
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
    .addEventListener("submit", event => {
        console.log("enviar o formulário")

        // não vai enviar o formulário
        event.preventDefault()
    })