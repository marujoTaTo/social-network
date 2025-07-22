const buttonCreate = document.getElementById("buttonCreate")

buttonCreate.addEventListener("click", sendingData)

async function sendingData (event) {
    event.preventDefault()

    const username = document.getElementById("inputUsername")
    const password = document.getElementById("inputPassword")

    const payload = { username, password }
    try{
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok) {
            throw new Error(`Status ${response.status}`)
        }

        const data = await response.json()
        return console.log(data)
    } catch(err) {
        console.error(`Error: ${err}`)
    }
}
